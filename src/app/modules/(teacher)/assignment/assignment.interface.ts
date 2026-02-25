import { Model, Types } from 'mongoose';

export type IAssignment = {
  title: string;
  teacher: Types.ObjectId;
  published: boolean;
  description: string;
  userGroup: Types.ObjectId[];
  userGroupTrack: Types.ObjectId;
  dueDate: Date;
  individualPoint: number;
  attachment?: string;
  submitAssignment?: Types.ObjectId;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
};

export type AssignmentModel = Model<IAssignment, Record<string, unknown>>;
