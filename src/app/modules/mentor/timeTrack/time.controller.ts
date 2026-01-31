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
    const userId = req.user.id;
    const timeTracks = await TimeTrackService.getMentorTimeTracksFromDB(userId);
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

export const mentorTimeTrack = {
    createTimeTrack,
    getMentorTimeTracks,
    getAllTimeTracks,
};