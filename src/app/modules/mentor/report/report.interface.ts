import mongoose from "mongoose";

export interface IWeeklyReport extends Document {
  studentId: mongoose.Types.ObjectId;
  weekStartDate: Date;
  weekEndDate: Date;
  isPresent: boolean;
  achievedHardOutcomes: string[]; 
  softSkillImprovements: string[];
  
  comments?: string;
  
  goalSheet: {
    skillName: string;
    plannedProgress: number; 
    actualProgress: number; 
  };
  
  objectives?: string; 
  createdAt: Date;
  updatedAt: Date;
}