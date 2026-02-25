import mongoose from "mongoose";

export interface ITimeTrack extends Document {
    mentorId: mongoose.Types.ObjectId;
    studentId: mongoose.Types.ObjectId;
    timeType: string;
    startTime: Date;
    endTime: Date;
    spentHours: number;
    comments?: string;
}
