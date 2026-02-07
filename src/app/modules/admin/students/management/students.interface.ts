import { Document, Types } from "mongoose";

export type IStudentStatus = 'active' | 'blocked' | 'dropped' | 'alumni';

export type IStudentReview = {
    reviewerId: Types.ObjectId; 
    date: Date;
    rating: number; 
    comment: string;
};


export type IAttendanceSummary = {
    totalClasses: number;
    presentCount: number;
    lastAttendanceDate: Date;
};

export interface IStudentProfile extends Document {
    userId: Types.ObjectId;
    studentId: string; 
    classId?: Types.ObjectId; 
    department?: string;
    rollNumber?: number;
    group?: string;
    track?: string;     
    
    mentorId?: Types.ObjectId;
    status: IStudentStatus; 
    
    // Performance & Goals
    woopGoals: Types.ObjectId[]; 
    reviews: IStudentReview[];   
    attendance: IAttendanceSummary;

    // Meta Data
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}