import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../shared/catchAsync";
import { ITimeTrack } from "./time.interface";
import { TimeTrack } from "./time.model";
import ApiError from "../../../../errors/ApiError";


const createTimeTrackFromDB = async (payload: ITimeTrack): Promise<any> => {
    const timeTrack = await TimeTrack.create(payload);
    return timeTrack;
};

const getMentorTimeTracksFromDB = async (id: string) => {
    const result = await TimeTrack.find({ mentorId: id })
        .populate('mentorId') 
        .sort({ startTime: -1 }); 

    return result;
};

const getAllMentorTimeTracksFromDB = async () => {
    const result = await TimeTrack.find()
        .populate('mentorId')
        .sort({ startTime: -1 }); 
    console.log(result);
    return result;
};

const updateTimeTrackInDB = async (id: string, payload: Partial<ITimeTrack>): Promise<any> => {
    const result = await TimeTrack.findByIdAndUpdate(
        id.trim(), 
        payload, 
        { 
            new: true, 
            runValidators: true 
        }
    );
    console.log(result);
    return result;
}

const deleteTimeTrackFromDB = async (id: string): Promise<void> => {
    const cleanId = id.trim(); 
    const result = await TimeTrack.findByIdAndDelete(cleanId);


    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Time Track not found');
    }
};

export const TimeTrackService = {
    createTimeTrackFromDB,
    getMentorTimeTracksFromDB,
    getAllMentorTimeTracksFromDB,
    updateTimeTrackInDB,
    deleteTimeTrackFromDB
};