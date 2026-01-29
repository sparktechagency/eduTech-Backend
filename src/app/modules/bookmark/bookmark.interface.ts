import { Model, Types } from "mongoose";

export type IBookmark= {
    customer: Types.ObjectId;
    PROVIDER: Types.ObjectId;
}

export type BookmarkModel = Model<IBookmark>;