import { Schema, model } from "mongoose";
import { IWoopGoal } from "./woops.interface";

const woopGoalSchema = new Schema<IWoopGoal>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goalIndex: {
        type: Number,
        default: 1
    },
    
    goalTitle: {
        type: String,
        required: [true, "Goal title is required"], 
        trim: true
    },
    goalDescription: {
        type: String,
        trim: true 
    },
    wish: {
        type: String,
        required: [true, "Wish is required"],
        trim: true
    },
    outcome: {
        type: String,
        required: [true, "Outcome is required"],
        trim: true
    },
    obstacle: {
        type: String,
        required: [true, "Obstacle is required"],
        trim: true
    },
    plan: {
        type: String,
        required: [true, "Plan is required"],
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collection: 'woop_goals'
});

export const WoopGoal = model<IWoopGoal>('WoopGoal', woopGoalSchema);