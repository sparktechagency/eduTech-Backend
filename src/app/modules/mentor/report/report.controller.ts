
// controller
import { Request, Response } from 'express';
import { WeeklyReport } from './report.model';
import catchAsync from '../../../../shared/catchAsync';

// Create a weekly report
const createWeeklyReport = catchAsync(async (req: Request, res: Response) => {
    const reportData = req.body;
    const newReport = await WeeklyReport.create(reportData);
    res.status(201).json({
        success: true,
        data: newReport,
    });
});

export const mentorWeeklyReport = {
    createWeeklyReport,
};