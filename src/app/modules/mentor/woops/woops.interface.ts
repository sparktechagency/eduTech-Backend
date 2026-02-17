import { Types } from "mongoose";

export interface IWoopSection {
    // mainData: string; 
    detail: string;    
    // summary: string;  
}

export interface IWoopGoal extends Document {
    userId: Types.ObjectId;
    mentor?: Types.ObjectId;
    goal?: Types.ObjectId;

    woop: IWoopSection;
    wish: IWoopSection;
    outcome: IWoopSection;
    obstacle: IWoopSection;
    plan: IWoopSection;

    progress: number;
    nextSessionDate?: Date;
    isCompleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
