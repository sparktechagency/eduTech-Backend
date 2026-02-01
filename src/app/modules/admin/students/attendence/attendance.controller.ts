import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import catchAsync from '../../../../../shared/catchAsync';
import sendResponse from '../../../../../shared/sendResponse';
import { AttendanceService } from './attendence.service';

const saveAttendance = catchAsync(async (req: Request, res: Response) => {
    const result = await AttendanceService.saveBatchAttendanceInDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Attendance saved successfully',
        data: result,
    });
});

const getAttendance = catchAsync(async (req: Request, res: Response) => {
    const result = await AttendanceService.getAttendanceByDateAndClass(req.query.date as string, req.query.classId as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Attendance retrieved successfully',
        data: result,
    });
});

export const AttendanceController = {
    saveAttendance,
    getAttendance
};