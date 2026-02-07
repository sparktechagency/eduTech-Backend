import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import QueryBuilder from '../../../../shared/apiFeature';
import { IAssignment } from './assignment.interface';
import { Assignment } from './assignment.model';
import { UserGroupTrack } from '../../user-group/user-group-track/user-group-track.model';
import { UserGroup } from '../../user-group/user-group.model';
import { RecentActivity } from '../recentActivities/recentActivity.model';

const createAssignmentToDB = async (payload: IAssignment) => {

  payload.totalPoint = Number(payload.totalPoint);

  if(payload.userGroupTrack){
    const isUserGroupTrackExist = await UserGroupTrack.exists({
      _id: payload.userGroupTrack
    });
    if(!isUserGroupTrackExist){
      throw new ApiError(StatusCodes.NOT_FOUND, "User Group Track Id not found!");
    }
  }
  if(payload.userGroup){
    const isUserGroupExist = await UserGroup.exists({_id: {$in: payload.userGroup}});
    if(!isUserGroupExist){
      throw new ApiError(StatusCodes.NOT_FOUND, "User Group Id not found!");
    }
  }
  const result = await Assignment.create(payload);

  // Create recent activity
  RecentActivity.create({
    title: `${result.title}`,
    description: ` ${result.description}`,
    type: "ASSIGNMENT",
    user: result.teacher,
    referenceId: result._id,
  });

  return  result ;
};

const getAllAssignmentsFromDB = async (query: Record<string, any>) => {
  const result = new QueryBuilder(Assignment.find()
  .populate('userGroup')
  .populate('userGroupTrack')
  .populate('submitAssignment'), query)
    .search(['title', 'description'])
    .filter()
    .sort()
    .paginate();
  const assignments = await result.queryModel;
  const pagination = await result.getPaginationInfo();
  return { assignments, pagination };
};

const getAssignmentByIdFromDB = async (id: string) => {
  const result = await Assignment.findById(id).populate('userGroup').populate('userGroupTrack');
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Assignment doesn't exist!");
  }
  return result;
};
const updateAssignmentToDB = async (id: string, payload: Partial<IAssignment>) => {

  if(payload.totalPoint){
    payload.totalPoint = Number(payload.totalPoint);
  }

  if(payload.userGroupTrack){
    const isUserGroupTrackExist = await UserGroupTrack.exists({
      _id: payload.userGroupTrack
    });
    if(!isUserGroupTrackExist){
      throw new ApiError(StatusCodes.NOT_FOUND, "User Group Track Id not found!");
    }
  }
  if(payload.userGroup){
    const isUserGroupExist = await UserGroup.exists({_id: {$in: payload.userGroup}});
    if(!isUserGroupExist){
      throw new ApiError(StatusCodes.NOT_FOUND, "User Group Id not found!");
    }
  }
  console.log('payload-',payload)
  const result = await Assignment.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Assignment doesn't exist!");
  }
  return  result ;
};

const deleteAssignmentFromDB = async (id: string) => {
  const result = await Assignment.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Assignment doesn't exist!");
  }
  return  result ;
};

export const AssignmentService = {
  createAssignmentToDB,
  getAllAssignmentsFromDB,
  getAssignmentByIdFromDB,
  updateAssignmentToDB,
  deleteAssignmentFromDB,
};
