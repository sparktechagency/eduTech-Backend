import { Model, Types } from 'mongoose';

export type IAssignment = {
  title: string;
  teacher: Types.ObjectId;
  published: boolean;
  description: string;
  userGroup: Types.ObjectId[];
  userGroupTrack: Types.ObjectId;
  dueDate: Date;
  totalPoint: number;
  attachment?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
};

export type AssignmentModel = Model<IAssignment, Record<string, unknown>>;
