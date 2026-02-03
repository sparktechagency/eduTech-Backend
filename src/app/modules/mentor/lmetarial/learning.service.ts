import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
import { ILearningMaterial } from "./learning.interface";
import { LearningMaterial } from "./learning.model";
import { query } from 'express';
import QueryBuilder from "../../../../shared/apiFeature";


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

//aaded search and sort functionality
const getAllMentorResourcesFromDB = async (query: Record<string, any>) => {
   const result = new QueryBuilder(LearningMaterial.find(), query)
    .search(['title', 'description', 'type'])
    .filter()
    .sort()
    .paginate();

    const resources = await result.queryModel
        .populate('mentorId') 
        // .populate('userGroup');
    const pagination = await result.getPaginationInfo();

    return { 
        resources,
        pagination 
    };       
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