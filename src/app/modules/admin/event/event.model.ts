import { model, Schema } from "mongoose";
import { IEvent } from "./event.interface";


const eventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: [true, "Event title is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: [true, "Event date is required"]
    },
    location: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['webinar', 'workshop', 'seminar', 'conference'],
        required: [true, "Event type is required"]
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'UserGroup',
        required: [true, "Associated user group is required"]
    },
    targetUser: [{
        type: Schema.Types.ObjectId,
        ref: 'UserGroupTrack'
    }]
    // targetUser: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'User'
    // }
}, {
    timestamps: true    
})
export const Event = model<IEvent>('Event', eventSchema);