import mongoose from "mongoose";
import { User } from "../../user/user.model";
import { Event } from "../../admin/event/event.model";
import { AssignmentsSub } from "../assignments/assignmentsSub.model";
import { Assignment } from "../../(teacher)/assignment/assignment.model";


const getMyStatsFromDB = async (userId: string) => {
  const result = await User.findById(userId)
    .populate('woop')
    .populate('Goals')
    .populate('mentorId')
    .populate('classId');

  if (!result) {
    throw new Error('Student profile not found for this user');
  }

  
  const totalSubmittedAssignments = await AssignmentsSub.countDocuments({
    studentId: result._id,
  });

  const countindividual = {
    totalSubmittedAssignments,
    totalClasses: result.classId ? (result.classId as any).totalClasses || 0 : 0,
    mentorName: result.mentorId
      ? `${(result.mentorId as any).firstName || ''} ${(result.mentorId as any).lastName || ''}`.trim()
      : '',
    totalGoals: result.Goals?.length || 0,  
    totalWoops: result.woop?.length || 0,
  };

  return countindividual;
};

const getUpcomingEventsFromDB = async (studentId: string) => {
  const upcomingEvents = await Event.find({ date: { $gte: new Date() } })
    .sort({ date: 1 })
    .limit(3)
    .select('title description date time image location type group');
  
  return upcomingEvents;
}


const getPendingAssignmentsFromDB = async (studentId: string) => {
  const activeAssignments = await Assignment.find({ dueDate: { $gte: new Date() } })
    .sort({ dueDate: 1 })
    .limit(3)
    .select('title description dueDate');
  
  return activeAssignments;
};



export const StudentStatsService = {
  getMyStatsFromDB,
    getUpcomingEventsFromDB,
    getPendingAssignmentsFromDB
}