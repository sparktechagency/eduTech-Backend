import { Request, Response } from 'express';
import catchAsync from '../../../../../shared/catchAsync';
import sendResponse from '../../../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AttendanceService } from './attendence.service';


// Save the whole list
const saveBatchAttendance = catchAsync(async (req: Request, res: Response) => {
    const takenBy = req.user.id;
    req.body.takenBy = takenBy;
    const result = await AttendanceService.saveBatchAttendanceInDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Class attendance saved successfully',
        data: result,
    });
});

// Update one student (Patch)
const updateStudentStatus = catchAsync(async (req: Request, res: Response) => {
    const { date, classId, studentId, status, note } = req.body;

    const result = await AttendanceService.updateSingleStudentStatus(
        date, 
        classId, 
        studentId, 
        status, 
        note
    );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student status updated successfully',
        data: result,
    });
});

// Get View
const getAttendance = catchAsync(async (req: Request, res: Response) => {
    const { date, classId } = req.query;

    const result = await AttendanceService.getAttendanceByDateAndClass(
        date as string, 
        classId as string
    );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Attendance fetched successfully',
        data: result,
    });
});

const getAttendanceStats = catchAsync(async (req: Request, res: Response) => {
    const { classId } = req.params;

    const result = await AttendanceService.getStudentAttendanceStats(classId, req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student attendance statistics fetched successfully',
        data: result,
    });
});

export const AttendanceController = {
    saveBatchAttendance,
    updateStudentStatus,
    getAttendance,
    getAttendanceStats
};