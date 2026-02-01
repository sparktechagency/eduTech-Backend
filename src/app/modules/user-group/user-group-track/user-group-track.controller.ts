import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { UserGroupTrackService } from './user-group-track.service';

const createUserGroupTrack = catchAsync(async (req: Request, res: Response) => {
  const { ...userGroupTrackData } = req.body;
  const { message, result } = await UserGroupTrackService.createUserGroupTrackToDB(userGroupTrackData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message,
    data: result,
  });
});

const getAllUserGroupTracks = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await UserGroupTrackService.getAllUserGroupTracksFromDB(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All user group tracks retrieved successfully',
    pagination: result.pagination,
    data: result.userGroupTracks,
  });
});

const getUserGroupTrackById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserGroupTrackService.getUserGroupTrackByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User group track retrieved successfully',
    data: result,
  });
});

const updateUserGroupTrack = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updateData } = req.body;
  const { message, result } = await UserGroupTrackService.updateUserGroupTrackToDB(id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message,
    data: result,
  });
});

const deleteUserGroupTrack = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { message, result } = await UserGroupTrackService.deleteUserGroupTrackFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message,
    data: result,
  });
});

const getTracksByUserGroup = catchAsync(async (req: Request, res: Response) => {
  const { userGroupId } = req.params;
  const query = req.query;
  const result = await UserGroupTrackService.getTracksByUserGroupFromDB(userGroupId, query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User group tracks retrieved successfully',
    pagination: result.pagination,
    data: result.userGroupTracks,
  });
});

export const UserGroupTrackController = {
  createUserGroupTrack,
  getAllUserGroupTracks,
  getUserGroupTrackById,
  updateUserGroupTrack,
  deleteUserGroupTrack,
  getTracksByUserGroup,
};
