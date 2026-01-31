import catchAsync from "../../../../shared/catchAsync";
import { TimeTrack } from "./time.model";
import { TimeTrackService } from "./time.service";


const createTimeTrack = catchAsync(async (req, res) => {
    const timeTrackData = req.body;
    const userId = req.user.id;
    timeTrackData.mentorId = userId;
    const newTimeTrack = await TimeTrackService.createTimeTrackFromDB(timeTrackData);
    res.status(201).json({
        success: true,
        data: newTimeTrack,
    });
});
  
const getMentorTimeTracks = catchAsync(async (req, res) => {
    const id = req.user.id;
    const timeTracks = await TimeTrackService.getMentorTimeTracksFromDB(id);
    res.status(200).json({
        success: true,
        data: timeTracks,
    });
});


const  getAllTimeTracks = catchAsync(async (req, res) => {
    const timeTracks = await TimeTrackService.getAllMentorTimeTracksFromDB();
    res.status(200).json({
        success: true,
        data: timeTracks,
    });
});

const updateTimeTrack = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const updatedTimeTrack = await TimeTrackService.updateTimeTrackInDB(id, updateData);
    res.status(200).json({
        success: true,
        data: updatedTimeTrack,
    });
});

const deleteTimeTrack = catchAsync(async (req, res) => {
    const id = req.params.id;
    await TimeTrackService.deleteTimeTrackFromDB(id);
    res.status(200).json({
        success: true,
        message: 'Time Track deleted successfully',
    });
});

export const mentorTimeTrack = {
    createTimeTrack,
    getMentorTimeTracks,
    getAllTimeTracks,
    updateTimeTrack,
    deleteTimeTrack,
};