import { model, Schema } from 'mongoose';
import { IUserGroupTrack, UserGroupTrackModel } from './user-group-track.interface';

const userGroupTrackSchema = new Schema<IUserGroupTrack, UserGroupTrackModel>(
  {
    name: {
      type: String,
      required: true,
    },
    userGroup: {
      type: Schema.Types.ObjectId,
      ref: 'UserGroup',
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const UserGroupTrack = model<IUserGroupTrack, UserGroupTrackModel>(
  'UserGroupTrack',
  userGroupTrackSchema
);
