import catchAsync from "../../../../shared/catchAsync";
import { LearningMaterialService } from "./learning.service";


const createResource = catchAsync(async (req, res) => {
    const result = req.body;
    const userId = req.user.id;
    result.createdBy = userId;
    const newResource = await LearningMaterialService.createResourceFromDB(result);
    res.status(201).json({
        success: true,
        data: newResource,
    });
});

const getCreatedByResources = catchAsync(async (req, res) => {
    const id = req.user.id;
    const resources = await LearningMaterialService.getCreatedByResourcesFromDB(id);
    res.status(200).json({
        success: true,
        data: resources,
    });
});

const getResourceById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const resource = await LearningMaterialService.getResourceByIdFromDB(id);
    res.status(200).json({
        success: true,
        data: resource,
    });
});

const  getAllResources = catchAsync(async (req, res) => {
    const resources = await LearningMaterialService.getAllMentorResourcesFromDB(req.query);
    res.status(200).json({
        success: true,
        data: resources,
    });
});

const updateResource = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    const updatedResource = await LearningMaterialService.updateResourceFromDB(id, updateData);
    res.status(200).json({
        success: true,
        data: updatedResource,
    });
});

const deleteResource = catchAsync(async (req, res) => {
    const id = req.params.id;
    await LearningMaterialService.deleteResourceFromDB(id);
    res.status(200).json({
        success: true,
        message: 'Learning Material deleted successfully',
    });
});

export const mentorLearningMaterial = {
    createResource,
    getCreatedByResources,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource
};