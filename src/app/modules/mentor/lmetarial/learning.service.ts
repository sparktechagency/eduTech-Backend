import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
import { ILearningMaterial } from "./learning.interface";
import { LearningMaterial } from "./learning.model";
import { query } from 'express';
import QueryBuilder from "../../../../shared/apiFeature";
import { User } from "../../user/user.model";


const createResourceFromDB = async (payload: ILearningMaterial) => {
    const resource  = await LearningMaterial.create(payload);
    return resource;
}


// const getCreatedByResourcesFromDB = async (createdBy: string) => {
//     const result = await LearningMaterial.find({ createdBy })
//         .populate('createdBy') 
//         .sort({ createdAt: -1 }); 

//     return result;
// };

// const getResourceByIdFromDB = async (id: string) => {
//     const result = await LearningMaterial.findById(id)
//         .populate('createdBy'); 

//     return result;
// };

// const getAllMentorResourcesFromDB = async (query: Record<string, any>) => {
//    const searchableFields = ['title', 'description', 'type', 'contentUrl'];

//    const qb = new QueryBuilder(LearningMaterial.find(), query)
//        .search(searchableFields)
//        .filter()
//        .sort()
//        .paginate();
//    const resources = await qb.getQuery()
//        .populate('createdBy') 
//        .populate('targertGroup'); // markAsAssigned is boolean, no need populate

//    const pagination = await qb.getPaginationInfo();

//    return { resources, pagination };
// };

// const getFilteredResourcesFromDB = async (query: Record<string, any>) => {
//     const searchableFields = ['title', 'type', 'targeteAudience'];

//     const qb = new QueryBuilder(LearningMaterial.find(), query)
//         .search(searchableFields)
//         .filter()
//         .sort()
//         .paginate();

//     const resources = await qb.getQuery()
//         .populate('targertGroup')
//         .select('-createdBy'); 

//     const pagination = await qb.getPaginationInfo();

//     return { resources, pagination };
// };

const getCreatedByResourcesFromDB = async (createdBy: string, query?: Record<string, any>) => {
  const safeQuery = query || {};

  const qb = new QueryBuilder(LearningMaterial.find({ createdBy }), safeQuery)
    .sort()
    .paginate();

  const resources = await qb.queryModel
    .populate('createdBy')
    .exec();

  const pagination = await qb.getPaginationInfo();

  return { resources, pagination };
};

const getResourceByIdFromDB = async (id: string) => {
  const resource = await LearningMaterial.findById(id)
    .populate('createdBy')
    // .populate('targetGroup') // if applicable
    .exec();

  return resource;
};

const getAllMentorResourcesFromDB = async (query?: Record<string, any>) => {
  const safeQuery = query || {};
  const searchableFields = ['title', 'description', 'type', 'contentUrl'];

  const qb = new QueryBuilder(LearningMaterial.find(), safeQuery)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const resources = await qb.queryModel
    .populate('createdBy')

    .exec();

  const pagination = await qb.getPaginationInfo();

  return { resources, pagination };
};

const getFilteredResourcesFromDB = async (query?: Record<string, any>) => {
  const safeQuery = query || {};
  const searchableFields = ['title', 'type', 'targetAudience']; // fixed typo

  const qb = new QueryBuilder(LearningMaterial.find(), safeQuery)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();

  const resources = await qb.queryModel
    .populate('targetGroup') // fix typo
    .select('-createdBy')
    .exec();

  const pagination = await qb.getPaginationInfo();

  return { resources, pagination };
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
    getCreatedByResourcesFromDB,
    getResourceByIdFromDB,
    getAllMentorResourcesFromDB,
    updateResourceFromDB,
    deleteResourceFromDB,
    getFilteredResourcesFromDB
};