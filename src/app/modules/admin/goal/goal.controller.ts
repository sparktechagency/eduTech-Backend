import { Request, Response } from "express";
import catchAsync from "../../../../shared/catchAsync";
import { goalService } from "./goal.service";


const createGoal = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await goalService.createGoalFromDb(payload);
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

const updateGoal = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const payload = req.body;
    const result = await goalService.updateGoalInDB(id, payload);
    res.status(200).json({
        success: true,
        ...result,
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