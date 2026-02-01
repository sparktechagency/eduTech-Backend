import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import QueryBuilder from '../../../../shared/apiFeature';
import { IClass } from './class.interface';
import { Class } from './class.model';

const createClassToDB = async (payload: IClass) => {
  const result = await Class.create(payload);
  const message = 'Class Created successfully';
  return { message, result };
};

const getAllClassesFromDB = async (query: Record<string, any>) => {
  const result = new QueryBuilder(Class.find().populate('userGroup').populate('userGroupTrack'), query)
    .search(['title', 'location', 'description'])
    .filter()
    .sort()
    .paginate();
  const classes = await result.queryModel;
  const pagination = await result.getPaginationInfo();
  return { classes, pagination };
};

const getClassByIdFromDB = async (id: string) => {
  const result = await Class.findById(id).populate('userGroup').populate('userGroupTrack');
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Class doesn't exist!");
  }
  return result;
};

const updateClassToDB = async (id: string, payload: Partial<IClass>) => {
  const result = await Class.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Class doesn't exist!");
  }
  const message = 'Class Updated successfully';
  return { message, result };
};

const deleteClassFromDB = async (id: string) => {
  const result = await Class.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Class doesn't exist!");
  }
  const message = 'Class Deleted successfully';
  return { message, result };
};

export const ClassService = {
  createClassToDB,
  getAllClassesFromDB,
  getClassByIdFromDB,
  updateClassToDB,
  deleteClassFromDB,
};
