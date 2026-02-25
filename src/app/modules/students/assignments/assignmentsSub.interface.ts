import { Types } from "mongoose"

export interface IAssignmentsSub extends Document {
    assignmentId: Types.ObjectId
    studentId: Types.ObjectId
    fileAssignment: string
    marks: number;
    feedback: string;
    status: string
    createdAt: Date
    updatedAt: Date
}