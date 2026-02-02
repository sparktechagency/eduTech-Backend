import { Model, Types } from "mongoose";

export type IReview = {
    MENTOR: Types.ObjectId;
    TEACHER: Types.ObjectId;
    COORDINATOR: Types.ObjectId;
    CLASS: Types.ObjectId;
    comment: string;
    rating: number;
}

export type ReviewModel = Model<IReview>;