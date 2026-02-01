import { Model, Types } from 'mongoose';

export type IClass = {
  title: string;
  description: string;
  classDate: Date;
  location: string;
  virtualClass: boolean;
  published: boolean;
  userGroup: Types.ObjectId[];
  userGroupTrack: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
};

export type ClassModel = Model<IClass, Record<string, unknown>>;
