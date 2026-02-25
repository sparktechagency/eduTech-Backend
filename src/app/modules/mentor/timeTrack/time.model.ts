import { Schema, model } from "mongoose";
import { ITimeTrack } from "./time.interface";


const weeklySchema = new Schema<ITimeTrack>({
    mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timeType: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    spentHours: { type: Number, required: true },
    comments: { type: String },
}, {
     timestamps: true,
    collection: 'timetracks'
});

export const TimeTrack = model<ITimeTrack>('TimeTrack', weeklySchema);