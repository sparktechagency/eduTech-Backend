import { Schema, model } from "mongoose";
import { IGoal } from "./goal.interface";


const goalSchema = new Schema<IGoal>({
    index: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: [true, "Goal title is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'goals'
});

export const Goal = model<IGoal>('Goal', goalSchema);