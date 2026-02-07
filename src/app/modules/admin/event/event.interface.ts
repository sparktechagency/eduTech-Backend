import { Document, Types } from 'mongoose';
export interface IEvent extends Document {
    title: string;
    description?: string;
    image: string;
    date: Date;
    location?: string;
    type: 'webinar' | 'workshop' | 'seminar' | 'conference';
    group: Types.ObjectId;
    targetUser: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}