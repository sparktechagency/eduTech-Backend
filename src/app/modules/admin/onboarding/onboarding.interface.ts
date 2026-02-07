import { Types } from "mongoose";

export interface IOnboarding {
  user: Types.ObjectId; 
  computerComfort: string; 
  hardestToLearn: string[];
  proudMoment: string; 
  interests: string[]; 
  successVision: string; 
}