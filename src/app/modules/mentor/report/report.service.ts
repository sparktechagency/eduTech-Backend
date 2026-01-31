import { IWeeklyReport } from "./report.interface";
import { WeeklyReport } from './report.model';
import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
const createWeeklyReport = async (payload: IWeeklyReport): Promise<any> => {
    const report = await WeeklyReport.create(payload);
    return report;
};


const getStudentReportsFromDB = async (studentId: string) => {
    const result = await WeeklyReport.find({ studentId })
        .populate('studentId') 
        .sort({ weekStartDate: -1 }); 

    return result;
};

const getAllStudentReportsFromDB = async () => {
    const result = await WeeklyReport.find()
        .populate('studentId') 
        .sort({ weekStartDate: -1 }); 

    return result;
};



const updateWeeklyReportInDB = async (id: string, payload: Partial<IWeeklyReport>): Promise<any> => {
    const result = await WeeklyReport.findByIdAndUpdate(
        id.trim(), 
        payload, 
        { 
            new: true, 
            runValidators: true 
        }
    );
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Weekly Report not found');
    }
    return result;
}

const deleteWeeklyReportFromDB = async (id: string): Promise<void> => {
    const cleanId = id.trim(); 
    const result = await WeeklyReport.findByIdAndDelete(cleanId);


    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Weekly Report not found');
    }
};

export const WeeklyReportService = {
    createWeeklyReport,
    getStudentReportsFromDB,
    getAllStudentReportsFromDB,
    deleteWeeklyReportFromDB,
    updateWeeklyReportInDB
};