import mongoose from "mongoose";

export interface ITimeTrack extends Document {
    mentorId: mongoose.Types.ObjectId;
    timeType: string;
    startTime: Date;
    endTime: Date;
    requesting: string;
    comments?: string;
}
