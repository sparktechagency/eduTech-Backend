import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { IEvent } from "./event.interface";
import { EventService } from "./event.service";
import httpStatus from "http-status-codes";

// const createEvent = catchAsync(async (req, res) => {
//     const result = await EventService.createEventFromDB(req.body);

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Event created successfully',
//         data: result,
//     });
// });
const createEvent = catchAsync(async (req, res) => {
    let payload = { ...req.body };

    if (payload.targetUser) {
        if (typeof payload.targetUser === 'string') {

            try {
                const parsed = JSON.parse(payload.targetUser);
                payload.targetUser = Array.isArray(parsed) ? parsed : [parsed];
            } catch (e) {
                payload.targetUser = (payload.targetUser as string)
                    .split(',')
                    .map((id: string) => id.trim())
                    .filter((id: string) => id);
            }
        } else if (!Array.isArray(payload.targetUser)) {
            payload.targetUser = [payload.targetUser];
        }
    } else {
        payload.targetUser = [];
    }

    if (req.files && typeof req.files === 'object' && !Array.isArray(req.files) && req.files['image']?.length > 0) {
        const imageFile = req.files['image'][0];
        payload.image = `/uploads/images/${imageFile.filename}`;
    } else {
    }
    const result = await EventService.createEventFromDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Event created successfully',
        data: result,
    });
});

const getAllEvents = catchAsync(async (req, res) => {
    const result = await EventService.getAllEventsFromDB();

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
    const result = await EventService.updateEventByIdInDB(req.params.id, req.body);

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