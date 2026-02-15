import { Schema, model } from "mongoose";
import { IWoopGoal } from "./woops.interface";
import WoopSectionSchema from "./woops.sub.model";

const WoopGoalSchema = new Schema<IWoopGoal>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        mentor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
       goal: {
            type: Schema.Types.ObjectId,
            ref: 'Goal',
        },

        wish: {
            type: WoopSectionSchema,
            required: false,
        },
        outcome: {
            type: WoopSectionSchema,
            required: false,
        },
        obstacle: {
            type: WoopSectionSchema,
            required: false,
        },
        plan: {
            type: WoopSectionSchema,
            required: false,
        },
       

        progress: {
            type: Number,
            default: 0,
        },
        nextSessionDate: {
            type: Date,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const WoopGoal = model<IWoopGoal>('WoopGoal', WoopGoalSchema);