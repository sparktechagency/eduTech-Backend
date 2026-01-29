
//create weekly report service

import { IWeeklyReport } from "./report.interface";
import { WeeklyReport } from './report.model';

const createWeeklyReport = async (payload: IWeeklyReport): Promise<any> => {
    //logic to create weekly report
    const report = await WeeklyReport.create(payload);
    return report;
};





export const WeeklyReportService = {
    createWeeklyReport,
};