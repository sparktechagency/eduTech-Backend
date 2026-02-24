import { get } from 'mongoose';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { StudentStatsService } from './stats.service';

const getMystats = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.user?.id;
  const result = await StudentStatsService.getMyStatsFromDB(studentId!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student stats retrieved successfully',
    data: result,
  });
});

const getUpcomingEvents = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.user?.id;
  const result = await StudentStatsService.getUpcomingEventsFromDB(studentId!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Upcoming events retrieved successfully',
    data: result,
  });
});

const getPendingAssignments = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.user?.id;
  const result = await StudentStatsService.getPendingAssignmentsFromDB(studentId!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pending assignments retrieved successfully',
    data: result,
  });
});

export const StudentStatsController = {
  getMystats,
  getUpcomingEvents,
  getPendingAssignments
};