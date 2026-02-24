import mongoose from "mongoose";
import { User } from "../../user/user.model";
import { Event } from "../../admin/event/event.model";
import { AssignmentsSub } from "../assignments/assignmentsSub.model";
import { Assignment } from "../../(teacher)/assignment/assignment.model";


const getMyStatsFromDB = async (studentId: string) => {
  const result = await User.findById(studentId)
    .populate('woopGoals')
    .populate('mentorId')
    .populate('classId');
  
  if (!result) {
    console.log("No User found for ID:", studentId);
    throw new Error('User not found');
  }

  const profileId = result._id;
  const submittedAssignmentsCount = await mongoose.model('AssignmentsSub')
    .countDocuments({ studentId: profileId });

  const countindividual = {
    totalSubmittedAssignments: submittedAssignmentsCount,
    totalClasses: result.classId ? (result.classId as any).totalClasses || 0 : 0,
    mentorTotal: result.mentorId ? (result.mentorId as any).totalMentor || 0 : 0,
    totalGoals: result.woopGoals?.length || 0,
  }
  
  return countindividual;
}

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