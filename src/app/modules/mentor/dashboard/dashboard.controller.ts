import { Request, Response } from 'express';
import catchAsync from '../../../../shared/catchAsync';
import { mentorDashboardService } from './dashboard.service';


const getMentorDashboardData = catchAsync(async (req: Request, res: Response) => {
    const mentorId = req.user?.id;
    const dashboardData = await mentorDashboardService.getMentorDashboardDataFromDB(mentorId);
    res.status(200).json({
        success: true,
        data: dashboardData,
    });
});

const getUpcomingSessions = catchAsync(async (req: Request, res: Response) => {
    const mentorId = req.user?.id;
    const upcomingSessions = await mentorDashboardService.getMentorDashboardWoops(mentorId);
    res.status(200).json({
        success: true,
        data: upcomingSessions,
    });
});

export const mentorDashboardController = {
    getMentorDashboardData,
    getUpcomingSessions,
};