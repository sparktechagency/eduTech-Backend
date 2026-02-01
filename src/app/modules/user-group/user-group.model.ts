import { model, Schema } from "mongoose";
import { IUserGroup, UserGroupModel } from "./user-group.interface";

const userGroupSchema = new Schema<IUserGroup, UserGroupModel>(
  {
    name: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const UserGroup = model<IUserGroup, UserGroupModel>(
  "UserGroup",
  userGroupSchema,
);
