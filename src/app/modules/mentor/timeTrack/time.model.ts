import { Schema, model } from "mongoose";
import { ITimeTrack } from "./time.interface";


const weeklySchema = new Schema<ITimeTrack>({
    mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timeType: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    requesting: { type: String, required: true },
    comments: { type: String },
}, { timestamps: true });

export const TimeTrack = model<ITimeTrack>('TimeTrack', weeklySchema);