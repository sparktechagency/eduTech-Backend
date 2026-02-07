import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
import { get } from "mongoose";
import { IOnboarding } from "./onboarding.interface";
import { Onboarding } from "./onboarding.model";
const saveOnboardingToDB = async (payload: Partial<IOnboarding>) => {
  const result = await Onboarding.findOneAndUpdate(
    { user: payload.user },
    payload,
    {
      new: true,
      upsert: true, 
      runValidators: true,
    }
  );
  return result;
};

const updateOnBoardingFromDB = async (userId: string, data: any) => {
    const result = await Onboarding.findOneAndUpdate(
        { user: userId },
        data,
        { new: true, runValidators: true }
    );
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Onboarding not found for this user');
    }
    return result;
}

const getOnBoardingFromDB = async (userId: string) => {
    const result = await Onboarding.findOne({ user: userId });
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Onboarding not found for this user');
    }
    return result;
}

const getByIdFromDB = async (id: string) => {
    const result = await Onboarding.findById(id);
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Onboarding not found');
    }
    return result;
}

export const OnboardingService = {
    saveOnboardingToDB,
    updateOnBoardingFromDB,
    getOnBoardingFromDB,
    getByIdFromDB
}