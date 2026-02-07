import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { OnboardingService } from "./onboarding.service";
import { get } from 'mongoose';

const createOnboarding = catchAsync(async (req, res) => {
    const userId = req.user.id; 
    const result = await OnboardingService.createOnBoardingFromDB(userId, req.body);

     sendResponse(res, {
         statusCode: StatusCodes.CREATED,
         success: true,
         message: 'Onboarding created successfully',
         data: result,
     });
});

const getOnboarding = catchAsync(async (req, res) => {
    const userId = req.user.id; 
    const result = await OnboardingService.getOnBoardingFromDB(userId);

     sendResponse(res, {
         statusCode: StatusCodes.OK,
         success: true,
         message: 'Onboarding retrieved successfully',
         data: result,
     });
});

const getOnboardingById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await OnboardingService.getByIdFromDB(id);

     sendResponse(res, {
         statusCode: StatusCodes.OK,
         success: true,
         message: 'Onboarding retrieved successfully',
         data: result,
     });
});

export const OnboardingController = {
    createOnboarding,
    getOnboarding,
    getOnboardingById
};