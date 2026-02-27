import { StatusCodes } from "http-status-codes";
import { USER_ROLES } from "../../../../enums/user";
import ApiError from "../../../../errors/ApiError";
import { User } from "../../user/user.model";
import { IUser } from "../../user/user.interface";
import { Types } from "mongoose";
import { Event } from "../../admin/event/event.model";
import { WoopGoal } from "../woops/woops.model";
import { Assignment } from "../../(teacher)/assignment/assignment.model";
import { WeeklyReport } from '../report/report.model';
import { TimeTrack } from "../timeTrack/time.model";
import { LearningMaterial } from "../lmetarial/learning.model";

type DashboardData = {
    assignedStudents: (IUser | Types.ObjectId)[] | undefined;
    woopGoals: { title: any; description: any; progress: any; nextSessionDate: any; }[];
    totalAssignedStudents: number;
    totalWoopGoals: number;
    averageProgress: number;
    weeklyReports: number;
    totalHours: number
};

const getMentorDashboardDataFromDB = async (
  mentorId: string
): Promise<DashboardData> => {
  const mentor = await User.findById(mentorId)
    .populate('assignedStudents', 'firstName lastName email profile contactNumber location')
    .populate('woop', 'title description progress nextSessionDate')
    .populate('Goals', 'title description progress nextSessionDate')
    .lean();

  if (!mentor || mentor.role !== USER_ROLES.MENTOR) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Mentor not found');
  }

  const weeklyReports = await WeeklyReport.countDocuments({ createdBy: mentorId });
  const timeStats = await TimeTrack.aggregate([
    { 
      $match: { mentorId: new Types.ObjectId(mentorId) } 
    },
    {
      $group: {
        _id: null,
        totalHours: {
          $sum: {
            $divide: [
              { $subtract: ["$endTime", "$startTime"] },
              3600000 
            ]
          }
        }
      }
    }
  ]);

  const assignedStudents = mentor.assignedStudents || [];
  const woopGoals = mentor.woopGoals || [];

  const totalAssignedStudents = assignedStudents.length;
  const totalWoopGoals = woopGoals.length;

  const averageProgress =
    totalWoopGoals > 0
      ? woopGoals.reduce((sum: number, goal: any) => sum + (goal.progress || 0), 0) / totalWoopGoals
      : 0;

  return {
    assignedStudents,
    woopGoals,
    totalAssignedStudents,
    totalWoopGoals,
    averageProgress: Math.round(averageProgress * 100) / 100, 
    weeklyReports,
    totalHours: timeStats.length > 0 ? Math.round(timeStats[0].totalHours * 10) / 10 : 0 
  };
};

const getMentorDashboardWoops = async (mentorId: string) => {
    const mentor = await User.findById(mentorId)
        .populate({ path: 'woopGoals', select: 'title description progress nextSessionDate' });

    if (!mentor || mentor.role !== USER_ROLES.MENTOR) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Mentor not found');
    }

    const event = await Event.findOne({ date: { $gte: new Date() } })
        .populate('group')
        .populate('targetUser');

    const woopsGoals = await WoopGoal.findOne().lean();

    return {
        event: event
            ? {
                title: event.title,
                description: event.description,
                date: event.date,
                location: event.location,
                type: event.type,
                group: event.group,
                targetUser: event.targetUser,
            }
            : null,

        woopsGoals: woopsGoals
            ? {
                goal: woopsGoals.goal,
                wish: woopsGoals.wish,
                outcome: woopsGoals.outcome,
                obstacle: woopsGoals.obstacle,
                plan: woopsGoals.plan,
            }
            : null,
    };
};


const getMentorStudentrdWoops = async (mentorId: string, query: Record<string, unknown>) => {
    
    const { filter } = query; 

    const mentor = await User.findById(mentorId)
        .populate({ path: 'woopGoals', select: 'title description progress nextSessionDate' });

    if (!mentor || mentor.role !== USER_ROLES.MENTOR) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Mentor not found');
    }

    const responseData: any = {};


    if (!filter || filter === 'event') {
        const events = await Event.find({ date: { $gte: new Date() } })
            .sort({ date: 1 }) 
            .limit(3)
            .populate('group')
            .populate('targetUser')
            .lean();

        responseData.events = events.length > 0 ? events.map(event => ({
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
            type: event.type,
            group: event.group,
            targetUser: event.targetUser,
        })) : [];
    }

    if (!filter || filter === 'resource' || filter === 'learningMat') {
        const learningMats = await LearningMaterial.find({})
            .sort({ createdAt: -1 }) 
            .limit(3)
            .populate('targertGroup', 'name published')
            .lean();

        responseData.learningMats = learningMats.length > 0 ? learningMats.map(mat => ({
            title: mat.title,
            type: mat.type,
            contentUrl: mat.contentUrl,
            targeteAudience: mat.targeteAudience,
            targertGroup: mat.targertGroup,
            markAsAssigned: mat.markAsAssigned,
        })) : [];
    }

    if (!filter || filter === 'woop') {
        const woopsGoals = await WoopGoal.find({})
            .sort({ createdAt: -1 })
            .limit(3)
            .lean();

        responseData.woopsGoals = woopsGoals.length > 0 ? woopsGoals.map(woop => ({
            goal: woop.goal,
            wish: woop.wish,
            outcome: woop.outcome,
            obstacle: woop.obstacle,
            plan: woop.plan,
        })) : [];
    }

    if (!filter || filter === 'assignment') {
        const assignments = await Assignment.find({
            status: { $in: ['pending', 'in_progress'] } 
        })
            .sort({ dueDate: 1 }) 
            .limit(3)
            .populate('submitAssignment', 'studentId fileAssignment')
            .lean();

        responseData.assignments = assignments.length > 0 ? assignments.map(assignment => ({
            teacher: assignment.teacher,
            submitAssignment: assignment.submitAssignment,
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            userGroup: assignment.userGroup,
            userGroupTrack: assignment.userGroupTrack,
            totalPoint: assignment.totalPoint,
            attachment: assignment.attachment,
            status: assignment.status,
        })) : [];
    }

    return responseData;
};
export const mentorDashboardService = {
    getMentorDashboardWoops,
    getMentorDashboardDataFromDB,
    getMentorStudentrdWoops,
};