
import { Request, Response } from 'express';
;
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { UserService } from './teacher.service';
import admin from 'firebase-admin';


const bulkUploadTeachers = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Please upload an excel file");
    }

    const result = await UserService.bulkImportTeachers(req.file.buffer);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Teachers imported successfully',
        data: result,
    });
});

const getAllTeachers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllTeachersFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Teachers retrieved successfully',
        data: result,
    });
});

const getTeacherById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getTeacherById(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Teacher retrieved successfully',
        data: result,
    });
});

const updateTeacher = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await UserService.updateTeacher(id, updateData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Teacher updated successfully',
        data: result,
    });
});

const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.deleteTeacher(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Teacher deleted successfully',
        data: result,
    });
});

export const adminTeacherController = {
    bulkUploadTeachers,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};