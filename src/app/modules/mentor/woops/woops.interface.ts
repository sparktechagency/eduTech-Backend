import { Document, Types } from "mongoose";

export interface IWoopGoal extends Document {
    userId: Types.ObjectId; 
    goalIndex: number;    
    goalTitle: string;       
    goalDescription?: string; 
    wish: string;          
    outcome: string;       
    obstacle: string;      
    plan: string;          
    isCompleted: boolean;   
    createdAt: Date;
    updatedAt: Date;
}