import { IEvent } from "./event.interface";
import { Event } from "./event.model";

const createEventFromDB = async (payload: Partial<IEvent>) => {
  const event = await Event.create(payload);
  return event;
};

const getAllEventsFromDB = async () => {
    const result = await Event.find()
    .populate("group")
    .populate("targetUser");
    return result;
}

const getEventByIdFromDB = async (id:string) => {
    const result = await Event.findById(id)
    .populate("group")
    .populate("targetUser");
    return result;
}

const updateEventByIdInDB = async (id:string, payload:Partial<IEvent>) => {
    const result = await Event.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return result;
}

const deleteEventByIdFromDB = async (id:string) => {
    const result = await Event.findByIdAndDelete(id);
    return result;
}

export const EventService = {
    createEventFromDB,
    getAllEventsFromDB,
    getEventByIdFromDB,
    updateEventByIdInDB,
    deleteEventByIdFromDB
};