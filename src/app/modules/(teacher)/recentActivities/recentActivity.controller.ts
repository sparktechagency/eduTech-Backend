import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { RecentActivityService } from './recentActivity.service';

const createRecentActivity = catchAsync(async (req: Request, res: Response) => {
  const { ...recentActivityData } = req.body;
  const { message, result } = await RecentActivityService.createRecentActivityToDB(recentActivityData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message,
    data: result,
  });
});

const getAllRecentActivities = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await RecentActivityService.getAllRecentActivitiesFromDB(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All recent activities retrieved successfully',
    pagination: result.pagination,
    data: result.recentActivities,
  });
});

const getRecentActivityById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RecentActivityService.getRecentActivityByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Recent activity retrieved successfully',
    data: result,
  });
});

const updateRecentActivity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updateData } = req.body;
  const { message, result } = await RecentActivityService.updateRecentActivityToDB(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message,
    data: result,
  });
});

const deleteRecentActivity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { message, result } = await RecentActivityService.deleteRecentActivityFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message,
    data: result,
  });
});

export const RecentActivityController = {
  createRecentActivity,
  getAllRecentActivities,
  getRecentActivityById,
  updateRecentActivity,
  deleteRecentActivity,
};
