import { Schema, model } from "mongoose";
import { IStudentTrack } from "./track.interface";


const trackSchema = new Schema<IStudentTrack>({
    name: {
        type: String,
        required: [true, "Track name is required"],
        unique: true,
        trim: true
    }
}, {
    timestamps: true
});

export const StudentTrack = model<IStudentTrack>('StudentTrack', trackSchema);