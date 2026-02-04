import { model, Schema } from 'mongoose';
import { Assignment } from '../../(teacher)/assignment/assignment.model';
import { IAssignmentsSub } from './assignmentsSub.interface';


const AssignmentsSubSchema = new Schema<IAssignmentsSub>({
    assignmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Assignment',
        required: [true, "Assignment ID is required"]
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'StudentProfile',
        required: [true, "Student ID is required"]
    },
    fileAssignment: {
        type: String,
        required: [true, "Submitted file URL is required"]
    },
    status: {
        type: String,
        enum: ['submitted', 'graded', 'late', 'missing'],
        default: 'submitted'
    }
}, {
    timestamps: true
});
// export const AssignmentsSub = Assignment.discriminator<IAssignmentsSub>('AssignmentsSub', AssignmentsSubSchema);
export const AssignmentsSub = model<IAssignmentsSub>('AssignmentsSub', AssignmentsSubSchema);