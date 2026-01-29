import { Model, Types } from "mongoose";

export type IReview = {
    customer: Types.ObjectId;
    PROVIDER: Types.ObjectId;
    service: Types.ObjectId;
    comment: string;
    rating: number;
}

export type ReviewModel = Model<IReview>;