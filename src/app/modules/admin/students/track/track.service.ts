import { StudentTrack } from "./track.model";

const createTrack = async (name: string) => {
    const track = new StudentTrack({ name });
    return await track.save();
}

const getAllTracks = async () => {
    const tracks = await StudentTrack.find();
    return tracks;
}

const getTrackById = async (id: string) => {
    const track = await StudentTrack.findById(id);
    return track;
}

const updateTrack = async (id: string, name: string) => {
    const track = await StudentTrack.findByIdAndUpdate(id, { name }, { new: true });
    if (!track) {
        throw new Error('Track not found');
    }
    return track;
}

const deleteTrack = async (id: string) => {
    const track = await StudentTrack.findByIdAndDelete(id);
    if (!track) {
        throw new Error('Track not found');
    }
    return track;   
}
export const TrackService = {
    createTrack,
    getAllTracks,
    getTrackById,
    updateTrack,
    deleteTrack
};