import QueryBuilder, { GetAllEventsQuery } from "../../../../shared/apiFeature";
import { IEvent } from "./event.interface";
import { Event } from "./event.model";

const createEventFromDB = async (payload: Partial<IEvent>) => {
  const event = await Event.create(payload);
  return event;
};

const getAllEventsFromDB = async (query?: GetAllEventsQuery) => {
  const safeQuery = query || {};

  const page = Number(safeQuery.page) || 1;
  const limit = Number(safeQuery.limit) || 10;
  const skip = (page - 1) * limit;

  let queryBuilder = Event.find();

  if (safeQuery.searchTerm) {
    queryBuilder = queryBuilder.find({
      $or: [
        { title: { $regex: safeQuery.searchTerm, $options: "i" } },
        { description: { $regex: safeQuery.searchTerm, $options: "i" } },
      ],
    });
  }

  const total = await queryBuilder.clone().countDocuments();

  const events = await queryBuilder
    .sort(safeQuery.sort || "-createdAt")
    .skip(skip)
    .limit(limit)
    .populate("group")
    .populate("targetUser")
    .exec();

  return {
    success: true,
    data: events || [],
    pagination: {
      total,
      totalPage: Math.ceil(total / limit),
      page,
      limit,
    },
  };
};

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