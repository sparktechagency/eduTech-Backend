import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
import QueryBuilder from "../../../../shared/apiFeature";
import { IGoal } from "./goal.interface";
import { Goal } from "./goal.model";



const createGoalFromDb = async ( payload: IGoal) => {
    const isGoalExist = await Goal.exists({ index: payload.index });
    if (isGoalExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Goal with this index already exists!");
    }

    const result = await Goal.create(payload);
    const message = "Goal created successfully";
    return { message, result };
}

const getAllGoalsFromDB = async (query: Record<string, any>) => {
    const result = new QueryBuilder(Goal.find(), query).search(['title', 'description']).filter().sort().paginate();
    const goals = await result.queryModel;
    const pagination = await result.getPaginationInfo();
    return { goals, pagination };
}

const getGoalByIdFromDB = async (id: string) => {
    const result = await Goal.findById(id);
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Goal doesn't exist!");
    }
    return result;
}

const updateGoalInDB = async (id: string, payload: Partial<IGoal>) => {
    if (payload.index) {
        const isGoalExist = await Goal.exists({ index: payload.index, _id: { $ne: id } });
        if (isGoalExist) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Goal with this index already exists!");
        }
    }

    const result = await Goal.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Goal doesn't exist!");
    }
    const message = "Goal updated successfully";
    return { message, result };
}

const deleteGoalFromDB = async (id: string) => {
    const result = await Goal.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Goal doesn't exist!");
    }
    const message = "Goal deleted successfully";
    return { message };
}

export const goalService = {
    createGoalFromDb,
    getAllGoalsFromDB,
    getGoalByIdFromDB,
    updateGoalInDB,
    deleteGoalFromDB
}