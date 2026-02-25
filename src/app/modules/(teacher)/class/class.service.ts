import { StatusCodes } from "http-status-codes";
import ApiError from "../../../../errors/ApiError";
import QueryBuilder from "../../../../shared/apiFeature";
import { IClass } from "./class.interface";
import { Class } from "./class.model";
import { User } from "../../user/user.model";
import { Types } from "mongoose";
import { RecentActivity } from "../recentActivities/recentActivity.model";

const createClassToDB = async (payload: IClass) => {
  const teacherInfo = await User.findById(payload.teacher);
  if (!teacherInfo) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Teacher doesn't exist!");
  }

  if (teacherInfo && teacherInfo.userGroupTrack) {
    payload.userGroupTrack = teacherInfo.userGroupTrack as Types.ObjectId;
  }
  if (teacherInfo && teacherInfo.userGroup) {
    payload.userGroup = teacherInfo.userGroup as Types.ObjectId[];
  }

  const result = await Class.create(payload);

  // Create recent activity
  RecentActivity.create({
    title: ` ${result.title}`,
    description: ` ${result.description}`,
    type: "CLASS",
    user: result.teacher,
    referenceId: result._id,
  });

  return result;
};

// const getAllClassesFromDB = async (query: Record<string, any>) => {
//   const result = new QueryBuilder(Class.find(), query)
//     .search(["title", "location", "description"])
//     .filter()
//     .sort()
//     .paginate();
//   const classes = await result.queryModel
//     .populate({
//       path: "userGroup",
//       select: "name",
//     })
//     .populate({
//       path: "userGroupTrack",
//       select: "name",
//     });
//   const pagination = await result.getPaginationInfo();
//   return { classes, pagination };
// };
const getAllClassesFromDB = async (query: Record<string, any>) => {
  let baseQuery = Class.find();

  if (query.userGroup) {
    const userGroupIds = Array.isArray(query.userGroup)
      ? query.userGroup
      : [query.userGroup];
    baseQuery = baseQuery.where("userGroup").in(userGroupIds);
  }

  if (query.userGroupTrack) {
    baseQuery = baseQuery.where("userGroupTrack").equals(query.userGroupTrack);
  }

  const result = new QueryBuilder(baseQuery, query)
    .search(["title", "location", "description"])
    .filter() 
    .sort()
    .paginate();

  const classes = await result.queryModel
    .populate({
      path: "userGroup",
      select: "name",
    })
    .populate({
      path: "userGroupTrack",
      select: "name",
    });

  const pagination = await result.getPaginationInfo();
  return { classes, pagination };
};

const getClassByIdFromDB = async (id: string) => {
  const result = await Class.findById(id)
    .populate("userGroup")
    .populate("userGroupTrack");
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
  const message = "Class Updated successfully";
  return { message, result };
};

const deleteClassFromDB = async (id: string) => {
  const result = await Class.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Class doesn't exist!");
  }
  const message = "Class Deleted successfully";
  return { message, result };
};

export const ClassService = {
  createClassToDB,
  getAllClassesFromDB,
  getClassByIdFromDB,
  updateClassToDB,
  deleteClassFromDB,
};
