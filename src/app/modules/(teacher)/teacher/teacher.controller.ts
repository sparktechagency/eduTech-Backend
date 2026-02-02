import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { TeacherService } from './teacher.service';


const getAllMyStudent = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const query = req.query;
  const result = await TeacherService.getAllMyStudent(user, query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All my students retrieved successfully',
    pagination: result.pagination,
    data: result.student,
  });
});

const getOverview = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await TeacherService.getOverview(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Teacher overview retrieved successfully',
    data: result,
  });
});



export const TeacherController = {
  getAllMyStudent,
  getOverview,
};
