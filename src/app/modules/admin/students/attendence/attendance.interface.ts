import { Document, Types } from "mongoose";

export type IAttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export type IStudentAttendanceDetail = {
    studentId: Types.ObjectId;
    status: IAttendanceStatus; 
    note?: string;           
};

export interface IClassAttendance extends Document {
    date: Date;                
    classId?: Types.ObjectId;  
    records: IStudentAttendanceDetail[]; 
    takenBy: Types.ObjectId;   
}