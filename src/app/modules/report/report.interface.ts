import { Model, Types } from "mongoose";

export type IReport = {
    customer: Types.ObjectId;
    PROVIDER: Types.ObjectId;
    reservation: Types.ObjectId;
    reason: [];
};

export type ReportModel = Model<IReport, Record<string, unknown>>;