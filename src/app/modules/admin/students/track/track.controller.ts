import catchAsync from "../../../../../shared/catchAsync";
import sendResponse from "../../../../../shared/sendResponse";
import { TrackService } from "./track.service";
import httpStatus from "http-status-codes";


const create = catchAsync(async (req, res) => {
    const { name } = req.body;
    const result = await TrackService.createTrack(name);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Track created successfully',
        data: result,
    });
});

const getAll = catchAsync(async (req, res) => {
    const result = await TrackService.getAllTracks();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Tracks retrieved successfully',
        data: result,
    });
});

const getById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TrackService.getTrackById(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Track retrieved successfully',
        data: result,
    });
});

const update = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await TrackService.updateTrack(id, name);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Track updated successfully',
        data: result,
    });
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await TrackService.deleteTrack(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Track deleted successfully',
        data: result,
    });
});

export const TrackController = {
    create,
    getAll,
    getById,
    update,
    remove
};