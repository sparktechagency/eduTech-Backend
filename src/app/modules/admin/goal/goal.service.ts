import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
import QueryBuilder from "../../../../shared/apiFeature";
import { IGoal } from "./goal.interface";
import { Goal } from "./goal.model";
import mongoose from "mongoose";
import { User } from "../../user/user.model";


const createGoalFromDb = async (studentId: string, payload: IGoal[]) => {
  const goalsArray = Array.isArray(payload) ? payload : [payload];

  const isUserExist = await User.findById(studentId).populate("Goals");
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");
  }

  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();

    const existingGoals = isUserExist.Goals || [];
    let result;

    if (existingGoals.length >= 3) {
      const updateResults = [];
    
      for (let i = 0; i < 3; i++) {
        const goalId = existingGoals[i]._id;
        const goalData = goalsArray[i];

        if (goalData) {
          const updatedGoal = await Goal.findByIdAndUpdate(
            goalId,
            { ...goalData },
            { session, new: true, runValidators: true }
          );
          updateResults.push(updatedGoal);
        }
      }
      result = updateResults;
    } 
    else {
      const newGoals = await Goal.insertMany(goalsArray, { session });
      const goalIds = newGoals.map(goal => goal._id);
      
      await User.findByIdAndUpdate(
        studentId,
        { $addToSet: { Goals: { $each: goalIds } } },
        { session, new: true }
      );
      result = newGoals;
    }

    await session.commitTransaction();
    return { 
      message: existingGoals.length >= 3 ? "Goals updated successfully" : "Goals created successfully", 
      result 
    };

  } catch (error: any) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

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