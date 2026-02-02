import mongoose, { SortOrder } from 'mongoose';
import { StudentProfile } from './students.model';
import {  IStudentProfile, IStudentReview } from './students.interface';

const createStudentIntoDB = async (payload: IStudentProfile) => {
  const result = await StudentProfile.create(payload);
  return result;
};

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const { searchTerm, ...filterData } = query;
  const andConditions = [];

  // Search Logic (Name, ID, Department)
  if (searchTerm) {
    andConditions.push({
      $or: ['studentId', 'department'].map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // Filter Logic (Exact match for status, batchId, mentorId)
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await StudentProfile.find(whereConditions)
    .populate('userId')    
    .populate('mentorId')   
    // .populate('batchId')    
    .populate('woopGoals')  
    .sort({ createdAt: 'desc' });

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentProfile.findById(id)
    .populate('userId')
    .populate('mentorId')
    .populate('woopGoals');
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

export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentInDB,
  addReviewToStudent,
  deleteStudentFromDB,
    // oopsGoalsFromDB
};