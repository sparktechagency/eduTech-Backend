import { Schema, model } from "mongoose";
import { IWeeklyReport } from "./report.interface";

const weeklySchema = new Schema<IWeeklyReport>({
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    weekStartDate: { type: Date, required: true },
    weekEndDate: { type: Date, required: true },
    isPresent: { type: Boolean, required: true },
    achievedHardOutcomes: { type: [String], required: true },
    softSkillImprovements: { type: [String], required: true },
    comments: { type: String },
    goalSheet: {
        skillName: { type: String, required: true },
        plannedProgress: { type: Number, required: true },
        actualProgress: { type: Number, required: true },
    },
    objectives: { type: String },
}, { timestamps: true });

export const WeeklyReport = model<IWeeklyReport>('WeeklyReport', weeklySchema);