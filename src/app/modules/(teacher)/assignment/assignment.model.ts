import { model, Schema } from 'mongoose';
import { AssignmentModel, IAssignment } from './assignment.interface';

const assignmentSchema = new Schema<IAssignment, AssignmentModel>(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    userGroup: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UserGroup',
        required: true,
      },
    ],
    userGroupTrack: {
      type: Schema.Types.ObjectId,
      ref: 'UserGroupTrack',
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    totalPoint: {
      type: Number,
      default: 100,
    },
    attachment: {
      type: String
    },
  
  },
  { timestamps: true }
);

export const Assignment = model<IAssignment, AssignmentModel>('Assignment', assignmentSchema);
