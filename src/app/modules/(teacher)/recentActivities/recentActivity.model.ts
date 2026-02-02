import { model, Schema } from 'mongoose';
import { IRecentActivity, RecentActivityModel } from './recentActivity.interface';

const recentActivitySchema = new Schema<IRecentActivity, RecentActivityModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['CLASS', 'ASSIGNMENT', 'NOTICE', 'OTHER'],
      default: 'OTHER',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const RecentActivity = model<IRecentActivity, RecentActivityModel>(
  'RecentActivity',
  recentActivitySchema
);
