import mongoose from "mongoose";

export interface IWeeklyReport extends Document {
    createdBy: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    weekStartDate: Date;
    weekEndDate: Date;
    isPresent: boolean;
    achievedHardOutcomes: string[];
    softSkillImprovements: string[];
    whatDidYouWorkOnThisWeek?: string;
    whatProgressDidTheStudentMake?: string;
    highLightAchivementsAndImprove?: string;
    planForNextWeek?: string;
    comments?: string;
    goalSheet: {
        skillName: string;
        plannedProgress: number;
        actualProgress: number;
    };
    objectives?: string;
}