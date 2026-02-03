import mongoose, { Types } from "mongoose";
import { ClassAttendance } from "./attendance.model";
import { IClassAttendance } from "./attendance.interface";
import ApiError from "../../../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import { query } from 'express';
import QueryBuilder from "../../../../../shared/apiFeature";

// Helper: Normalize Date to handle Timezone issues
const getDayRange = (dateStr: string | Date) => {
    const targetDate = new Date(dateStr);
    if (isNaN(targetDate.getTime())) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Date Format. Use YYYY-MM-DD");
    }
    
    // Start of Day (00:00:00)
    const start = new Date(targetDate);
    start.setUTCHours(0, 0, 0, 0);

    // End of Day (23:59:59)
    const end = new Date(targetDate);
    end.setUTCHours(23, 59, 59, 999);

    return { start, end };
};

// 1. CREATE/UPDATE BATCH (For the "Save Attendance" button)
const saveBatchAttendanceInDB = async (payload: IClassAttendance) => {
    // ১. ডেট রেঞ্জ বের করা
    const targetDate = new Date(payload.date);
    const start = new Date(targetDate);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(targetDate);
    end.setUTCHours(23, 59, 59, 999);

    const result = await ClassAttendance.findOneAndUpdate(
        { 
            classId: payload.classId, 
            date: { $gte: start, $lte: end } 
        },
        {
            $set: {
                date: start,
                classId: payload.classId,
                takenBy: payload.takenBy,
                records: payload.records
            }
        },
        { 
            new: true,  
            upsert: true, 
            runValidators: true
        }
    );

    return result;
};



const updateSingleStudentStatus = async (
    dateStr: string, 
    classId: string, 
    studentId: string, 
    status: string, 
    note: string = ""
) => {
    const { start, end } = getDayRange(dateStr);

    // Step A: Find the sheet
    const attendanceRecord = await ClassAttendance.findOne({ 
        classId: classId,
        date: { $gte: start, $lte: end }
    });

    if (!attendanceRecord) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Attendance sheet not found. Please click 'Save Attendance' to create the sheet first.");
    }

    const studentExists = attendanceRecord.records.find(
        (r: any) => r.studentId.toString() === studentId
    );

    let result;

    if (studentExists) {
        result = await ClassAttendance.findOneAndUpdate(
            { 
                _id: attendanceRecord._id, 
                "records.studentId": studentId 
            },
            {
                $set: {
                    "records.$.status": status,
                    "records.$.note": note
                }
            },
            { new: true }
        );
    } else {
        result = await ClassAttendance.findByIdAndUpdate(
            attendanceRecord._id,
            {
                $push: {
                    records: {
                        studentId,
                        status,
                        note
                    }
                }
            },
            { new: true }
        );
    }

    return result;
};

const getAttendanceByDateAndClass = async (dateStr: string, classId: string) => {
    const { start, end } = getDayRange(dateStr);

    const result = await ClassAttendance.findOne({ 
        classId,
        date: { $gte: start, $lte: end }
    }).populate({
        path: 'records.studentId',
        select: 'studentId name userId rollNumber image', 
        populate: {
            path: 'userId', 
            select: 'name profile'
        }
    });

    return result;
};

const getStudentAttendanceStats = async (classId: string, query: Record<string, any>) => {
    
    const pipeline: any[] = [
        { $match: { classId: new Types.ObjectId(classId) } },
        { $unwind: "$records" },
        { 
            $group: {
                _id: "$records.studentId",
                totalClasses: { $sum: 1 },
                presentCount: { $sum: { $cond: [{ $eq: ["$records.status", "present"] }, 1, 0] } },
                absentCount: { $sum: { $cond: [{ $eq: ["$records.status", "absent"] }, 1, 0] } },
                lateCount: { $sum: { $cond: [{ $eq: ["$records.status", "late"] }, 1, 0] } },
                excusedCount: { $sum: { $cond: [{ $eq: ["$records.status", "excused"] }, 1, 0] } }
            }
        },
        { 
            $lookup: {
                from: "studentprofiles",
                localField: "_id",
                foreignField: "userId", 
                as: "studentDetails"
            }
        },
        { $unwind: { path: "$studentDetails", preserveNullAndEmptyArrays: true } },
        { 
            $lookup: {
                from: "users",
                localField: "_id",  
                foreignField: "_id",
                as: "userDetails"
            }
        },
        { $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } },
        { 
            $project: {
                _id: 0,
                studentId: "$_id",
                name: { $ifNull: ["$userDetails.name", "Unknown Student"] },
                rollNumber: { $ifNull: ["$studentDetails.rollNumber", null] },
                image: { $ifNull: ["$userDetails.profile", null] },
                attendance: {
                    total: "$totalClasses",
                    present: "$presentCount",
                    absent: "$absentCount",
                    late: "$lateCount",
                    percentage: {
                        $cond: [
                            { $eq: ["$totalClasses", 0] },
                            0,
                            { $multiply: [{ $divide: [{ $add: ["$presentCount", "$lateCount"] }, "$totalClasses"] }, 100] }
                        ]
                    }
                }
            }
        }
    ];

    if (query.searchTerm) {
        pipeline.push({
            $match: {
                name: { $regex: query.searchTerm, $options: 'i' }
            }
        });
    }

    if (query.sort) {
        const sortField = query.sort.startsWith('-') ? query.sort.slice(1) : query.sort;
        const sortOrder = query.sort.startsWith('-') ? -1 : 1;
        pipeline.push({ $sort: { [sortField]: sortOrder } });
    } else {
        pipeline.push({ $sort: { name: 1 } });
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const countPipeline = [...pipeline];
    countPipeline.push({ $count: "total" });
    const totalResult = await ClassAttendance.aggregate(countPipeline);
    const total = totalResult[0]?.total || 0;

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    const stats = await ClassAttendance.aggregate(pipeline);

    return {
        data: stats,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

export const AttendanceService = {
    saveBatchAttendanceInDB,
    updateSingleStudentStatus,
    getAttendanceByDateAndClass,
    getStudentAttendanceStats
};