import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserGroupService } from './user-group.service';

//user group
const createUserGroup = catchAsync(async (req: Request, res: Response) => {
    const { ...userGroupData } = req.body
    const { message, result } = await UserGroupService.createUserGroupToDB(userGroupData)
  
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message,
        data: result
    })
})

const getUserGroup = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await UserGroupService.getUserGroupFromDB(query)
  
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User group retrieved successfully',
        data: result
    })
})

//user group by id
const getUserGroupById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await UserGroupService.getUserGroupByIdFromDB(id)
  
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User group retrieved successfully',
        data: result
    })
})

//all user groups
const getAllUserGroups = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await UserGroupService.getAllUserGroupsFromDB(query)
  
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'All user groups retrieved successfully',
        pagination: result.pagination,
        data: result.userGroups
    })
})

//update user group
const updateUserGroup = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const { ...updateData } = req.body
    const { message, result } = await UserGroupService.updateUserGroupToDB(id, updateData)
  
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message,
        data: result
    })
})

//delete user group
const deleteUserGroup = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const { message, result } = await UserGroupService.deleteUserGroupFromDB(id)
  
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message,
        data: result
    })
})

export const UserGroupController = {
    createUserGroup,
    getUserGroup,
    getUserGroupById,
    getAllUserGroups,
    updateUserGroup,
    deleteUserGroup
}
