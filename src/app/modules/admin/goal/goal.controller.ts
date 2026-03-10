import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { goalService } from "./goal.service";
import sendResponse from "../../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";


const createGoal = catchAsync(async (req: Request, res: Response) => {
    const studentId = req.params.studentId; 
    const payload = req.body;
    const result = await goalService.createGoalFromDb(studentId, payload);
    res.status(201).json({
        success: true,
        ...result,
    });
});

const getAllGoals = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await goalService.getAllGoalsFromDB(req.query);
    res.status(200).json({
        success: true,
        ...result,
    });
});

const getGoalById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await goalService.getGoalByIdFromDB(id);
    res.status(200).json({
        success: true,
        data: result,
    });
});

const updateGoal = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await goalService.updateGoalInDB(id, payload);
    
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Goal updated successfully',
        data: result,
    });
});

const deleteGoal = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await goalService.deleteGoalFromDB(id);
    res.status(200).json({
        success: true,
        ...result,
    });
});

export const goalController = {
    createGoal,
    getAllGoals,
    getGoalById,
    updateGoal,
    deleteGoal
};