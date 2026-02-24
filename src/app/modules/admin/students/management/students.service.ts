import mongoose, { SortOrder } from 'mongoose';
import { StudentProfile } from './students.model';
import {  IStudentProfile, IStudentReview } from './students.interface';
import { User } from '../../../user/user.model';
import QueryBuilder from '../../../../../shared/apiFeature';

const createStudentIntoDB = async (payload: IStudentProfile) => {
  const result = await StudentProfile.create(payload);
  return result;
};

// const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
//   const { searchTerm, ...filterData } = query;
//   const andConditions = [];

//   // Search Logic (Name, ID, Department)
//   if (searchTerm) {
//     andConditions.push({
//       $or: ['studentId', 'department'].map((field) => ({
//         [field]: { $regex: searchTerm, $options: 'i' },
//       })),
//     });
//   }

//   // Filter Logic (Exact match for status, batchId, mentorId)
//   if (Object.keys(filterData).length) {
//     andConditions.push({
//       $and: Object.entries(filterData).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }

//   const whereConditions =
//     andConditions.length > 0 ? { $and: andConditions } : {};

//   const result = await User.find({  role: 'student', ...whereConditions })
//     .populate('userId')    
//     .populate('mentorId')   
//     // .populate('batchId')    
//     .populate('woopGoals')
//     .populate('classId', 'title description classDate location virtualClass published status userGroup userGroupTrack')
//     .sort({ createdAt: 'desc' });

//   return result;
// };

const getAllStudentsFromDB = async (query: Record<string, any>) => {

  const queryBuilder = new QueryBuilder(
    User.find({ role: 'STUDENT' }), query)
    .search(['studentId', 'department'])
    .filter()
    .sort()
    .paginate();

  const result = await queryBuilder.queryModel
    .populate('mentorId' , 'firstName lastName email profile contact location')
    .populate('woopGoals' , 'title description status')
    .populate('classId', 'title description classDate location virtualClass published status userGroup userGroupTrack')
    .exec();

  const pagination = await queryBuilder.getPaginationInfo();

  return { data: result, pagination };
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await User.findById(id)
    // .populate('userId')
    .populate('mentorId')
    .populate('woopGoals', 'title description status')
    .populate('classId', 'title description classDate location virtualClass published status userGroup userGroupTrack');
  return result;
};

// 4. Update Student (Use this for: Assign Mentor, Update Attendance, Change Status)
const updateStudentInDB = async (id: string, payload: Partial<IStudentProfile>) => {
  const result = await StudentProfile.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// 5. Special Service: Add Review (Admin/Mentor gives review)
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



// 6. Delete Student (Soft Delete)
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentProfile.findByIdAndUpdate(
    id,
    { isDeleted: true, status: 'blocked' }, 
    { new: true }
  );
  return result;
};

const getmystatsFromDB = async (userId: string) => {
  const result = await StudentProfile.findOne({ studentId: userId }) 
    .populate('woopGoals')
    .populate('mentorId')
    .populate('classId');
  
  if (!result) {
    console.log("No StudentProfile found for User ID:", userId);
    throw new Error('Student profile not found for this user');
  }

  const profileId = result._id;
  const submittedAssignmentsCount = await mongoose.model('AssignmentsSub')
    .countDocuments({ studentId: profileId });

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