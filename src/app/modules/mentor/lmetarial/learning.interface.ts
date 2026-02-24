import e from "express";
import { Types } from "mongoose";
import { ResourceType } from "../../../../enums/serviceType";


export interface ILearningMaterial extends Document {
    createdBy: Types.ObjectId;
    title: string;
    description?: string;
    dueDate?: Date;
    type: ResourceType;
    contentUrl: string;
    targeteAudience: string;
    targertGroup?: Types.ObjectId;
    markAsAssigned?: boolean;
    createdAt: Date;
    updatedAt: Date;
}