import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
import QueryBuilder from "../../../../shared/apiFeature";
import { IGoal } from "./goal.interface";
import { Goal } from "./goal.model";
import mongoose from "mongoose";
import { User } from "../../user/user.model";


// const createGoalFromDb = async (studentId: string, payload: IGoal) => {
//   const isGoalExist = await Goal.exists({ index: payload.index });
//   if (isGoalExist) {
//     throw new ApiError(StatusCodes.BAD_REQUEST, "Goal with this index already exists!");
//   }

//   const isUserExist = await User.findById(studentId);
//   if (!isUserExist) {
//     throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");
//   }

//   const session = await mongoose.startSession();
  
//   try {
//     session.startTransaction();

//     const newGoal = await Goal.create([payload], { session });
//     const goalId = newGoal[0]._id;

//     await User.findByIdAndUpdate(
//       studentId,
//       {
//         $addToSet: { Goals: goalId } 
//       },
//       { session, new: true }
//     );

//     await session.commitTransaction();
//     session.endSession();

//     return { 
//       message: "Goal created and assigned to student successfully", 
//       result: newGoal[0] 
//     };

//   } catch (error: any) {
//     await session.abortTransaction();
//     session.endSession();
//     throw error;
//   }
// };

const createGoalFromDb = async (studentId: string, payload: IGoal[]) => {
  const goalsArray = Array.isArray(payload) ? payload : [payload];
  const indices = goalsArray.map(goal => goal.index);
  const existingGoals = await Goal.find({ index: { $in: indices } });
  
  if (existingGoals.length > 0) {
    const existingIndices = existingGoals.map(g => g.index).join(', ');
    throw new ApiError(StatusCodes.BAD_REQUEST, `Goals with indices [${existingIndices}] already exist!`);
  }


  const isUserExist = await User.findById(studentId);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found!");
  }

  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();

    const newGoals = await Goal.insertMany(goalsArray, { session });
    
    const goalIds = newGoals.map(goal => goal._id);
    await User.findByIdAndUpdate(
      studentId,
      {
        $addToSet: { Goals: { $each: goalIds } } 
      },
      { session, new: true }
    );

    await session.commitTransaction();
    session.endSession();

    return { 
      message: `${newGoals.length} Goals created and assigned successfully`, 
      result: newGoals 
    };

  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw error;
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