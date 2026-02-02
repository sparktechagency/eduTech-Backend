import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import QueryBuilder from '../../../../shared/apiFeature';
import { IRecentActivity } from './recentActivity.interface';
import { RecentActivity } from './recentActivity.model';

const createRecentActivityToDB = async (payload: IRecentActivity) => {
  const result = await RecentActivity.create(payload);
  const message = 'Recent Activity Created successfully';
  return { message, result };
};

const getAllRecentActivitiesFromDB = async (query: Record<string, any>) => {
  const result = new QueryBuilder(RecentActivity.find().populate('user', 'name email'), query)
    .search(['title', 'description', 'type'])
    .filter()
    .sort()
    .paginate();
  const recentActivities = await result.queryModel;
  const pagination = await result.getPaginationInfo();
  return { recentActivities, pagination };
};

const getRecentActivityByIdFromDB = async (id: string) => {
  const result = await RecentActivity.findById(id).populate('user');
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Recent Activity doesn't exist!");
  }
  return result;
};

const updateRecentActivityToDB = async (id: string, payload: Partial<IRecentActivity>) => {
  const result = await RecentActivity.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Recent Activity doesn't exist!");
  }
  const message = 'Recent Activity Updated successfully';
  return { message, result };
};

const deleteRecentActivityFromDB = async (id: string) => {
  const result = await RecentActivity.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Recent Activity doesn't exist!");
  }
  const message = 'Recent Activity Deleted successfully';
  return { message, result };
};

export const RecentActivityService = {
  createRecentActivityToDB,
  getAllRecentActivitiesFromDB,
  getRecentActivityByIdFromDB,
  updateRecentActivityToDB,
  deleteRecentActivityFromDB,
};
