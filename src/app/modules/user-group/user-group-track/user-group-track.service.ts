import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import QueryBuilder from '../../../../shared/apiFeature';
import { IUserGroupTrack } from './user-group-track.interface';
import { UserGroupTrack } from './user-group-track.model';

const createUserGroupTrackToDB = async (payload: IUserGroupTrack) => {
  const result = await UserGroupTrack.create(payload);
  const message = 'User Group Track Created successfully';
  return { message, result };
};

const getAllUserGroupTracksFromDB = async (query: Record<string, any>) => {
  const result = new QueryBuilder(UserGroupTrack.find().populate('userGroup'), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate();
  const userGroupTracks = await result.queryModel;
  const pagination = await result.getPaginationInfo();
  return { userGroupTracks, pagination };
};

const getUserGroupTrackByIdFromDB = async (id: string) => {
  const result = await UserGroupTrack.findById(id).populate('userGroup');
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User Group Track doesn't exist!");
  }
  return result;
};

const updateUserGroupTrackToDB = async (id: string, payload: Partial<IUserGroupTrack>) => {
  const result = await UserGroupTrack.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User Group Track doesn't exist!");
  }
  const message = 'User Group Track Updated successfully';
  return { message, result };
};

const deleteUserGroupTrackFromDB = async (id: string) => {
  const result = await UserGroupTrack.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User Group Track doesn't exist!");
  }
  const message = 'User Group Track Deleted successfully';
  return { message, result };
};

const getTracksByUserGroupFromDB = async (userGroupId: string, query: Record<string, any>) => {
  const result = new QueryBuilder(UserGroupTrack.find({ userGroup: userGroupId }), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate();
  const userGroupTracks = await result.queryModel;
  const pagination = await result.getPaginationInfo();
  return { userGroupTracks, pagination };
};

export const UserGroupTrackService = {
  createUserGroupTrackToDB,
  getAllUserGroupTracksFromDB,
  getUserGroupTrackByIdFromDB,
  updateUserGroupTrackToDB,
  deleteUserGroupTrackFromDB,
  getTracksByUserGroupFromDB,
};
