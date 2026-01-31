import e from "express";
import { Types } from "mongoose";
import { ResourceType } from "../../../../enums/serviceType";


export interface ILearningMaterial extends Document {
    mentorId: Types.ObjectId;
    title: string;
    type: ResourceType;
    Category: Types.ObjectId;
    link: string;
    createdAt: Date;
    updatedAt: Date;
}