import { Types } from "mongoose"

export interface IAssignmentsSub extends Document {
    assignmentId: Types.ObjectId
    studentId: Types.ObjectId
    fileAssignment: string
    // status: string
    createdAt: Date
    updatedAt: Date
}