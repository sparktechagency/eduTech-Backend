import { Schema, model } from "mongoose";
import { IClassAttendance } from "./attendance.interface";

const classAttendanceSchema = new Schema<IClassAttendance>({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class', 
        required: true
    },
    takenBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    records: [{
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'StudentProfile', 
            required: true
        },
        status: {
            type: String,
            enum: ['present', 'absent', 'late', 'excused'],
            required: true
        },
        note: {
            type: String,
            trim: true
        }
    }]
}, {
    timestamps: true
});

// one attendance per batch per date
classAttendanceSchema.index({ date: 1, batchId: 1 }, { unique: true });

export const ClassAttendance = model<IClassAttendance>('ClassAttendance', classAttendanceSchema);