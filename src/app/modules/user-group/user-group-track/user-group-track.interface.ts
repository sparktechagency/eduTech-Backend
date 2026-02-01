import { Model, Types } from 'mongoose';

export type IUserGroupTrack = {
  name: string;
  userGroup: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
  published: boolean;
};

export type UserGroupTrackModel = Model<IUserGroupTrack, Record<string, unknown>>;
