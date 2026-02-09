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
    .populate('woopGoals', 'title description progress nextSessionDate')
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
                goalIndex: woopsGoals.goalIndex,
                title: woopsGoals.goalTitle,
                description: woopsGoals.goalDescription,
                wish: woopsGoals.wish,
                outcome: woopsGoals.outcome,
                obstacle: woopsGoals.obstacle,
                plan: woopsGoals.plan,
            }
            : null,
    };
};

const getMentorStudentrdWoops = async (mentorId: string) => {
    const mentor = await User.findById(mentorId)
        .populate({ path: 'woopGoals', select: 'title description progress nextSessionDate' });

    if (!mentor || mentor.role !== USER_ROLES.MENTOR) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Mentor not found');
    }

    const event = await Event.findOne({ date: { $gte: new Date() } })
        .populate('group')
        .populate('targetUser');

    const woopsGoals = await WoopGoal.findOne().lean();

    const assignment = await Assignment.findOne().lean()
        .populate('submitAssignment', 'studentId fileAssignment')
        // .populate('Assignment', 'title description dueDate userGroup userGroupTrack totalPoint attachment status teacher');

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
                goalIndex: woopsGoals.goalIndex,
                title: woopsGoals.goalTitle,
                description: woopsGoals.goalDescription,
                wish: woopsGoals.wish,
                outcome: woopsGoals.outcome,
                obstacle: woopsGoals.obstacle,
                plan: woopsGoals.plan,
            }
            : null,
        assignment: assignment
            ? {
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
                }
            : null,
    };
};

export const mentorDashboardService = {
    getMentorDashboardWoops,
    getMentorDashboardDataFromDB,
    getMentorStudentrdWoops,
};