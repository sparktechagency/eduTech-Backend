import { Schema, model } from "mongoose";
import { ILearningMaterial } from "./learning.interface";
import { ResourceType } from '../../../../enums/serviceType';
import { USER_ROLES } from "../../../../enums/user";


const learningMaterialSchema = new Schema<ILearningMaterial>({
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    title: { type: String, required: true },

    type: {
        type: String, 
        enum: Object.values(ResourceType),
        required: true,
    },
    contentUrl: { type: String, required: false },
    targeteAudience: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.STUDENT,
            required: true
        },
    targertGroup: { type: Schema.Types.ObjectId, ref: 'UserGroupTrack', required: false },
    markAsAssigned: { type: Boolean, required: false },
    
}, { timestamps: true });

export const LearningMaterial = model<ILearningMaterial>('LearningMaterial', learningMaterialSchema);