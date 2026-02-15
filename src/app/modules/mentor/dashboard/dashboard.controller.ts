import { Request, Response } from 'express';
import catchAsync from '../../../../shared/catchAsync';
import { mentorDashboardService } from './dashboard.service';
import { get } from 'mongoose';


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

const getMentorStudentrdWoops = catchAsync(async (req: Request, res: Response) => {
    const mentorId = req.user?.id;
    const query = req.query;
    const studentWoops = await mentorDashboardService.getMentorStudentrdWoops(mentorId, query);
    res.status(200).json({
        success: true,
        data: studentWoops,
    });
});

export const mentorDashboardController = {
    getMentorDashboardData,
    getUpcomingSessions,
    getMentorStudentrdWoops
};