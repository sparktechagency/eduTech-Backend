import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { IEvent } from "./event.interface";
import { EventService } from "./event.service";
import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const createEvent = catchAsync(async (req: Request, res: Response) => {
  
  
  // const files = req.files as {
  //   [fieldname: string]: Express.Multer.File[];
  // };

  // let imagePath: string | undefined;

  // if (files?.image && files.image.length > 0) {
  //   imagePath = `/images/${files.image[0].filename}`;
  // }

  // const {
  //   title,
  //   description,
  //   date,
  //   location,
  //   type,
  //   group,
  //   targetUser,
  // } = req.body;

  // let parsedTargetUser = targetUser;
  // if (typeof targetUser === "string") {
  //   parsedTargetUser = JSON.parse(targetUser);
  // }

  // const eventData = {
  //   title,
  //   description,
  //   date,
  //   location,
  //   type,
  //   group,
  //   targetUser: parsedTargetUser,
  //   image: imagePath,
  // };

  const result = await EventService.createEventFromDB(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Event created successfully",
    data: result,
  });
});

const getAllEvents = catchAsync(async (req, res) => {
    const result = await EventService.getAllEventsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Events retrieved successfully',
        data: result,
    });
});

const getEventById = catchAsync(async (req, res) => {
    const result = await EventService.getEventByIdFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Event retrieved successfully',
        data: result,
    });
});

const updateEventById = catchAsync(async (req, res) => {

  const payload = { ...req.body };
const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  let imagePath: string | undefined;

  if (files?.image && files.image.length > 0) {
    imagePath = `/images/${files.image[0].filename}`;
    payload.image = imagePath;
  }
  const result = await EventService.updateEventByIdInDB(
    req.params.id,
    payload
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event updated successfully',
    data: result,
  });
});

const deleteEventById = catchAsync(async (req, res) => {
    const result = await EventService.deleteEventByIdFromDB(req.params.id); 

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Event deleted successfully',
        data: result,   
    })
});

export const EventController = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById
};