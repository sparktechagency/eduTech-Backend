import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../shared/catchAsync";
import sendResponse from "../../../../shared/sendResponse";
import { OnboardingService } from "./onboarding.service";
import { Request, Response } from "express";
import { IOnboarding } from "./onboarding.interface";
import httpStatus from "http-status-codes";

const completeOnboarding = catchAsync(async (req: Request, res: Response) => {

  const onboardingData = {
    ...req.body,
    user: (req as any).user.id, 
  };

  Object.keys(onboardingData).forEach((key) => {
    let value = onboardingData[key];
    
    if (typeof value === 'string') {
      value = value.trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          onboardingData[key] = JSON.parse(value.replace(/'/g, '"'));
        } catch (e) {
          onboardingData[key] = value
            .replace(/[\[\]'"]/g, '')
            .split(',')
            .map((s: string) => s.trim());
        }
      }
    }
  });

  const result = await OnboardingService.saveOnboardingToDB(onboardingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Onboarding goals saved successfully',
    data: result,
  });
});

const getOnboarding = catchAsync(async (req, res) => {
    // const userId = req.user.id; 
    const result = await OnboardingService.getOnBoardingFromDB();

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
    completeOnboarding,
    getOnboarding,
    getOnboardingById
};