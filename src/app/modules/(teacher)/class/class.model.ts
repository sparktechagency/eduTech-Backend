import { model, Schema } from 'mongoose';
import { ClassModel, IClass } from './class.interface';

const classSchema = new Schema<IClass, ClassModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    classDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    virtualClass: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
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
  },
  { timestamps: true }
);

export const Class = model<IClass, ClassModel>('Class', classSchema);
