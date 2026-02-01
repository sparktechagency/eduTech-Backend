import { Schema, model } from "mongoose";
import { ILearningMaterial } from "./learning.interface";
import { ResourceType } from '../../../../enums/serviceType';


const learningMaterialSchema = new Schema<ILearningMaterial>({
    mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    Category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    title: { type: String, required: true },
type: {
        type: String, 
        enum: Object.values(ResourceType),
        required: true,
    },
    link: { type: String, required: true },
    
}, { timestamps: true });

export const LearningMaterial = model<ILearningMaterial>('LearningMaterial', learningMaterialSchema);