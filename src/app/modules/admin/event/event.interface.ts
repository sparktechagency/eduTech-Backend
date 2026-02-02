import { Document, Types } from 'mongoose';
export interface IEvent extends Document {
    title: string;
    description?: string;
    date: Date;
    location?: string;
    type: 'webinar' | 'workshop' | 'seminar' | 'conference';
    group: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}