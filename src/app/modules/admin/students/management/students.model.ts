import { Schema, model, Query, FilterQuery } from "mongoose";
import { IStudentProfile } from "./students.interface";
import { object } from "zod";

const studentProfileSchema = new Schema<IStudentProfile>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: [true, "User ID is required"],
        unique: true 
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    
    // Academic Information
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class', 
        requiured: false
    },
    department: {
        type: String,
        trim: true
    },
    rollNumber: {
        type: Number
    },
    group: {
       type: Schema.Types.ObjectId,
       ref: 'UserGroup',
         required: false
    },
    track: {
        type: String,
        trim: true
    },

    // Management & Assignment
    mentorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['active', 'blocked', 'dropped', 'alumni'],
        default: 'active'
    },

    // WOOP Goals Link (Images: image_e89655.png, image_e81f13.png)
    woopGoals: [{
        type: Schema.Types.ObjectId,
        ref: 'WoopGoal' 
    }],

    // Administrative Reviews
    reviews: [{
        reviewerId: { type: Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String, trim: true }
    }],

    // Attendance Summary
    attendance: {
        totalClasses: { type: Number, default: 0 },
        presentCount: { type: Number, default: 0 },
        lastAttendanceDate: { type: Date }
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
});

studentProfileSchema.pre(/^find/, function (next) {
    const query = this as Query<IStudentProfile[], IStudentProfile>;
    query.find({ isDeleted: { $ne: true } } as FilterQuery<IStudentProfile>);
    
    next();
});

export const StudentProfile = model<IStudentProfile>('StudentProfile', studentProfileSchema);