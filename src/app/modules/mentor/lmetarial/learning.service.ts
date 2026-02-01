import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
import { ILearningMaterial } from "./learning.interface";
import { LearningMaterial } from "./learning.model";


const createResourceFromDB = async (payload: ILearningMaterial) => {
    const resource  = await LearningMaterial.create(payload);
    return resource;
}

const getMentorResourcesFromDB = async (mentorId: string) => {
    const result = await LearningMaterial.find({ mentorId })
        .populate('mentorId') 
        .sort({ createdAt: -1 }); 

    return result;
};

const getResourceByIdFromDB = async (id: string) => {
    const result = await LearningMaterial.findById(id)
        .populate('mentorId'); 

    return result;
};

const getAllMentorResourcesFromDB = async () => {
    const result = await LearningMaterial.find()
        .populate('mentorId') 
        .sort({ createdAt: -1 }); 

    return result;
};

const updateResourceFromDB = async (id: string, payload: ILearningMaterial) => {
    const result = await LearningMaterial.findByIdAndUpdate(
        id, payload, 
        {
             new: true, 
            runValidators: true
            }
        );
        if (!result) {
            throw new ApiError(StatusCodes.NOT_FOUND, ('Resource not found'));
        }
    return result;
};

const deleteResourceFromDB = async (id: string) => {
    const cleanId = id.trim();
    const result = await LearningMaterial.findByIdAndDelete(cleanId);

    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
    }
}

export const LearningMaterialService = {
    createResourceFromDB,
    getMentorResourcesFromDB,
    getResourceByIdFromDB,
    getAllMentorResourcesFromDB,
    updateResourceFromDB,
    deleteResourceFromDB
};