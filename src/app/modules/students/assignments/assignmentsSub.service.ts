import { StatusCodes } from 'http-status-codes';
import { Assignment } from '../../(teacher)/assignment/assignment.model';
import ApiError from '../../../../errors/ApiError';
import { UserGroupTrack } from '../../user-group/user-group-track/user-group-track.model';
import { UserGroup } from '../../user-group/user-group.model';
import { User } from '../../user/user.model';
import { Event } from '../../admin/event/event.model';
import { IAssignmentsSub } from './assignmentsSub.interface';
import { AssignmentsSub } from './assignmentsSub.model';
import QueryBuilder from '../../../../shared/apiFeature';
import mongoose, { Types } from 'mongoose';

const submitAssignmentIntoDB = async (payload: IAssignmentsSub) => {
  const result = await AssignmentsSub.create(payload);
  const assignment = await Assignment.findById(payload.assignmentId);
  if (!assignment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Assignment not found');
  }
  else if (assignment.status === 'IN_PROGRESS') {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot submit to a already you submited assignment');
  }

  assignment!.status = 'IN_PROGRESS';
  await assignment!.save();
  return result;
};

const getSubmissionsForTeacherFromDB = async (assignmentId: string) => {
  const result = await AssignmentsSub.find({ assignmentId })
    .populate('studentId')
    .populate('assignmentId');
  return result;
};

const getStudentOwnSubmissionsFromDB = async (studentId: string) => {
  const result = await AssignmentsSub.find({ studentId })
    .populate('assignmentId');
  return result;
};

const getMyAssignmentsFromDB = async (userId: string) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
    }

    if (!user.userGroupTrack) {
        return [];
    }

   
    const query: any = {
        userGroupTrack: user.userGroupTrack,
        published: true 
    };

    if (user.userGroup && user.userGroup.length > 0) {
        query.userGroup = { $in: user.userGroup };
    }

    const result = await Assignment.find(query)
        .populate('teacher', 'firstName lastName profile')
        .populate('userGroup')
        .populate('userGroupTrack')
        .populate('submitAssignment')
        .sort({ createdAt: -1 });

    return result;
};

//get not expired eveent like show upcoming when date is already pass not show
const getupcomigEventsFromDB = async () => {
  const currentDate = new Date();
 const result = await Event.find({ date: { $gte: currentDate } })
    .sort({ date: 1 });

  return result;
}
const getAllsubmitedAssignmentsFromDB = async (
  teacherId: string,
  query: Record<string, unknown>
) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  let assignmentIds: Types.ObjectId[] = [];

  if (query.assignmentId) {
    if (!Types.ObjectId.isValid(query.assignmentId as string)) {
      throw new Error('Invalid assignmentId');
    }
    assignmentIds = [new Types.ObjectId(query.assignmentId as string)];
  } else {
    const teacherAssignments = await Assignment.find({
      teacher: new Types.ObjectId(teacherId),
    }).select('_id');
    assignmentIds = teacherAssignments.map((a) => new Types.ObjectId(a._id.toString()));
  }

  const total = await AssignmentsSub.countDocuments({
    assignmentId: { $in: assignmentIds },
  });

  const result = await AssignmentsSub.find({
    assignmentId: { $in: assignmentIds },
  })
    .populate('assignmentId', 'title description dueDate totalPoint status attachment')
    .populate('studentId', 'name email role')
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    meta: {
      total,
      totalPage: Math.ceil(total / limit),
      page,
      limit,
    },
    data: result,
  };
};
// const getAllsubmitedAssignmentsFromDB = async (
//   teacherId: string,
//   query: Record<string, unknown>
// ) => {
//   const page = Number(query.page) || 1;
//   const limit = Number(query.limit) || 10;
//   const skip = (page - 1) * limit;

//   // Step 1: Get all assignment IDs that belong to this teacher
//   const teacherAssignments = await Assignment.find({
//     teacher: new Types.ObjectId(teacherId),
//   }).select('_id');

//   const assignmentIds = teacherAssignments.map((a) => a._id);

//   // Step 2: Find all submissions where assignmentId matches teacher's assignments
//   const total = await AssignmentsSub.countDocuments({
//     assignmentId: { $in: assignmentIds },
//   });

//   const result = await AssignmentsSub.find({
//     assignmentId: { $in: assignmentIds },
//   })
//     .populate('assignmentId', 'title description dueDate totalPoint status attachment')
//     .populate('studentId', 'name email role')
//     .skip(skip)
//     .limit(limit)
//     .lean();

//   return {
//     meta: {
//       total,
//       totalPage: Math.ceil(total / limit),
//       page,
//       limit,
//     },
//     data: result,
//   };
// };

export const AssignmentsSubService = {
  submitAssignmentIntoDB,
  getSubmissionsForTeacherFromDB,
  getStudentOwnSubmissionsFromDB,
  getMyAssignmentsFromDB ,
  getupcomigEventsFromDB,
  getAllsubmitedAssignmentsFromDB
};