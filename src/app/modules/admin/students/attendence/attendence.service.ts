import { ClassAttendance } from "./attendance.model";
import { IClassAttendance } from "./attendance.interface";

// Create or Update Attendance (Upsert)
const saveBatchAttendanceInDB = async (payload: IClassAttendance) => {
 
    const result = await ClassAttendance.findOneAndUpdate(
        { 
            date: payload.date, 
            classId: payload.classId 
        },
        payload,
        { 
            new: true,  
            upsert: true, 
            runValidators: true
        }
    );

    return result;
};

// Get Attendance for a specific Date & Class (To show in UI)
const getAttendanceByDateAndClass = async (date: string, classId: string) => {
    const result = await ClassAttendance.findOne({ date, classId })
        .populate('records.studentId', 'studentId userId name'); 
    return result;
};

export const AttendanceService = {
    saveBatchAttendanceInDB,
    getAttendanceByDateAndClass
};