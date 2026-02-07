import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
import { Onboarding } from "./onboarding.model";
import { get } from "mongoose";


const createOnBoardingFromDB = async (userId: string, data: any) => {
    const existingOnboarding = await Onboarding.findOne({ user: userId });
    if (existingOnboarding) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Onboarding already exists for this user');
    }
    const onboardingData = { user: userId, ...data };
    const result = await Onboarding.create(onboardingData);
    return result;
}

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
    createOnBoardingFromDB,
    updateOnBoardingFromDB,
    getOnBoardingFromDB,
    getByIdFromDB
}