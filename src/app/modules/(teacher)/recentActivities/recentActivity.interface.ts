import { Model, Types } from 'mongoose';

export type IRecentActivity = {
  title: string;
  description: string;
  type: 'CLASS' | 'ASSIGNMENT' | 'NOTICE' | 'OTHER';
  user: Types.ObjectId;
  referenceId?: Types.ObjectId;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
};

export type RecentActivityModel = Model<IRecentActivity, Record<string, unknown>>;
