import { Types } from 'mongoose';

export interface IOnboarding {
  user: Types.ObjectId;
  [key: string]: any; 
}