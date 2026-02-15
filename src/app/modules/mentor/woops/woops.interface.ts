import { Types } from "mongoose";

export interface IWoopSection {
    mainData: string;    //  "What is an important wish that you want to fulfill?"
    detail: string;      //  "What is your wish?" (Type here...)
    summary: string;     //  "Describe your wish in a few words..."
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
