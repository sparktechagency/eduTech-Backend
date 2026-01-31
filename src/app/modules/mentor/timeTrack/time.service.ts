import catchAsync from "../../../../shared/catchAsync";
import { ITimeTrack } from "./time.interface";
import { TimeTrack } from "./time.model";


const createTimeTrackFromDB = async (payload: ITimeTrack): Promise<any> => {
    const timeTrack = await TimeTrack.create(payload);
    return timeTrack;
};

const getMentorTimeTracksFromDB = async (mentorId: string) => {
    const result = await TimeTrack.find({ mentorId })
        .populate('mentorId') 
        .sort({ startTime: -1 }); 

    return result;
};

const getAllMentorTimeTracksFromDB = async () => {
    const result = await TimeTrack.find()
        .populate('mentorId') 
        .sort({ startTime: -1 }); 

    return result;
};

export const TimeTrackService = {
    createTimeTrackFromDB,
    getMentorTimeTracksFromDB,
    getAllMentorTimeTracksFromDB,
};