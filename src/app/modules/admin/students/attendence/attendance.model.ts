import { Schema, model } from "mongoose";
import { IClassAttendance } from "./attendance.interface";

const classAttendanceSchema = new Schema<IClassAttendance>({
    date: {
        type: Date,
        required: true,
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
            default: 'present',
            required: true
        },
        note: { type: String, trim: true, default: '' }
    }]
}, {
    timestamps: true
});

classAttendanceSchema.index({ date: 1, classId: 1 }, { unique: true });

export const ClassAttendance = model<IClassAttendance>('ClassAttendance', classAttendanceSchema);