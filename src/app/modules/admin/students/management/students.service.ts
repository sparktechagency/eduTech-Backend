import mongoose, { SortOrder, Types } from 'mongoose';
import { StudentProfile } from './students.model';
import {  IStudentProfile, IStudentReview } from './students.interface';
import { User } from '../../../user/user.model';
import QueryBuilder from '../../../../../shared/apiFeature';
import { UserGroupTrack } from '../../../user-group/user-group-track/user-group-track.model';
import { UserGroup } from '../../../user-group/user-group.model';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../../errors/ApiError';

const createStudentIntoDB = async (payload: IStudentProfile) => {
  const result = await StudentProfile.create(payload);
  return result;
};


const getAllStudentsFromDB = async (query: Record<string, any>) => {
  const { userGroup, userGroupTrack, ...restQuery } = query;

  const baseFilter: Record<string, any> = { role: 'STUDENT' };

  if (userGroup) {
    if (!Types.ObjectId.isValid(userGroup)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid userGroup ID');
    }
    baseFilter.userGroup = new Types.ObjectId(userGroup);
  }

  if (userGroupTrack) {
    if (!Types.ObjectId.isValid(userGroupTrack)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid userGroupTrack ID');
    }
    baseFilter.userGroupTrack = new Types.ObjectId(userGroupTrack);
  }

  const queryBuilder = new QueryBuilder(
    User.find(baseFilter),
    restQuery  
  )
    .search([
      'studentId', 'department', 'group', 'track',
      'location', 'email', 'firstName', 'lastName', 'status'
    
    ])
    .filter()
    .sort()
    .paginate();

  const result = await queryBuilder.queryModel
    .populate('mentorId', 'firstName lastName email profile contact location')
    .populate('woop', 'title')
    .populate('Goals', 'title index description')
    .populate({
      path: 'classId',
      select: 'title description classDate location virtualClass published status',
      populate: [
        { path: 'userGroup', select: 'name description', model: 'UserGroup' },
        { path: 'userGroupTrack', select: 'name description', model: 'UserGroupTrack' },
      ],
    })
    .populate({ path: 'userGroup', select: 'name description', model: 'UserGroup' })
    .populate({ path: 'userGroupTrack', select: 'name description', model: 'UserGroupTrack' })
    .exec();

  const pagination = await queryBuilder.getPaginationInfo();
  return { data: result, pagination };
};



const getSingleStudentFromDB = async (id: string) => {
  const result = await User.findById(id)
    .populate('mentorId')

    .populate({
      path: 'woop',
      populate: {
        path: 'goal'
      }
    })

    .populate('Goals') 

    .populate({
      path: 'classId',
      populate: [
        { path: 'userGroup' },
        { path: 'userGroupTrack' }
      ]
    })

    .populate({
      path: 'review.teacherId', 
    })

    .populate({
      path: 'assignedStudents',
      populate: [
        {
          path: 'review.teacherId'
        },
        {
          path: 'classId'
        }
      ]
    })
    .populate({
      path: 'userGroup',
      select: 'name description',
      model: 'UserGroup',
    })
    .populate({
      path: 'userGroupTrack',
      select: 'name description',
      model: 'UserGroupTrack',
    })
    .exec();

  return result;
};
const updateStudentInDB = async (id: string, payload: Partial<IStudentProfile>) => {
  const result = await StudentProfile.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const addReviewToStudent = async (studentId: string, reviewData: IStudentReview) => {
  const result = await StudentProfile.findByIdAndUpdate(
    studentId,
    {
      $push: { reviews: reviewData }, 
    },
    { new: true, runValidators: true }
  );
  return result;
};


const deleteStudentFromDB = async (id: string) => {
  const result = await StudentProfile.findByIdAndUpdate(
    id,
    { isDeleted: true, status: 'blocked' }, 
    { new: true }
  );
  return result;
};

const getmystatsFromDB = async (userId: string) => {
  const result = await User.findOne({ studentId: userId }) 
    .populate('woop')
    .populate('Goals')
    .populate('mentorId')
    .populate('classId');
  
  if (!result) {
    console.log("No StudentProfile found for User ID:", userId);
    throw new Error('Student profile not found for this user');
  }

  const profileId = result._id;
  const submittedAssignmentsCount = await User.countDocuments({
     studentId: profileId, 'assignments.status': 'submitted' 
    });


  const countindividual = {
    totalSubmittedAssignments: submittedAssignmentsCount,
    totalClasses: result.classId ? (result.classId as any).totalClasses || 0 : 0,
    mentorName: result.mentorId ? (result.mentorId as any).name || '' : '',
    totalGoals: result.woopGoals?.length || 0,
  }
  
  return countindividual;
}

// saveOnboardingAnswers
const saveOnboardingAnswersFromDB = async (studentId: string, answers: Record<string, any>) => {
  const result = await StudentProfile.findByIdAndUpdate(
    studentId,
    { onboardingAnswers: answers },
    { new: true, runValidators: true }
  );
  return result;
};

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentInDB,
  addReviewToStudent,
  deleteStudentFromDB,
    getmystatsFromDB,
    saveOnboardingAnswersFromDB
};