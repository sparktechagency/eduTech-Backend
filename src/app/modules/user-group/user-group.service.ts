import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../errors/ApiError'
import { IUserGroup } from './user-group.interface'
import { UserGroup } from './user-group.model'
import QueryBuilder from '../../../shared/apiFeature'

//user group
const createUserGroupToDB = async (payload: IUserGroup) => {
    // check if user group exist or not
    const isExistUserGroup = await UserGroup.findOne({ name: payload.name })

    if (isExistUserGroup) {
        throw new ApiError(StatusCodes.CONFLICT, "User Group already exists!")
    }

    // create new if not exist
    const result = await UserGroup.create(payload)
    const message = "User Group Created successfully"

    return { message, result }
}

const getUserGroupFromDB = async (query: Record<string, any>) => {
    const result = new QueryBuilder(UserGroup.find(), query).search(['name']).filter().paginate();
    const userGroups = await result.queryModel;
    const pagination = await result.getPaginationInfo();

    return { userGroups, pagination };
}
//user group by id
const getUserGroupByIdFromDB = async (id: string) => {
    const result = await UserGroup.findById(id)
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User Group doesn't exist!")
    }
    return result
}

//all user groups
const getAllUserGroupsFromDB = async (query: Record<string, any>) => {
    const result = new QueryBuilder(UserGroup.find(), query).search(['name']).sort().filter().paginate();
    const userGroups = await result.queryModel;
    const pagination = await result.getPaginationInfo();
    return { userGroups, pagination };
}

//update user group
const updateUserGroupToDB = async (id: string, payload: IUserGroup) => {
    const result = await UserGroup.findByIdAndUpdate(id, payload, {new: true})
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User Group doesn't exist!")
    }
    const message = "User Group Updated successfully"
    return { message, result }
}

//delete user group
const deleteUserGroupFromDB = async (id: string) => {
    const result = await UserGroup.findByIdAndDelete(id)
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User Group doesn't exist!")
    }
    const message = "User Group Deleted successfully"
    return { message, result }
}
  
export const UserGroupService = {
    createUserGroupToDB,
    getUserGroupFromDB,
    getUserGroupByIdFromDB,
    getAllUserGroupsFromDB,
    updateUserGroupToDB,
    deleteUserGroupFromDB
}
