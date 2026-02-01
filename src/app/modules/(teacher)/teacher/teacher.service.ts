import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../../../shared/apiFeature";
import { User } from "../../user/user.model";
import { IUser } from "../../user/user.interface";
import { IUserGroup } from "../../user-group/user-group.interface";
import { USER_ROLES } from "../../../../enums/user";

const getAllMyStudent = async ( user: JwtPayload, query: Record<string, any>) => {
  const teacher = (await User.findById(user.id, "userGroup userGroupTrack").lean().populate("userGroup")) as IUser & {
    userGroup: IUserGroup[] | null;
    userGroupTrack: any;
  };
  
  const groupIds = teacher.userGroup?.map((group: { _id: any }) => group._id) || [];
  const trackId = teacher.userGroupTrack;

  const getAllStudent = new QueryBuilder(
    User.find({
      role: USER_ROLES.STUDENT,
      $or: [{ userGroup: { $in: groupIds } }, { userGroupTrack: trackId }],
    }),query)
    .filter()
    .search(["name", "email"])
    .paginate()

  const student = await getAllStudent.queryModel
    .populate({ path: "userGroup", select: "name" })
    .populate({ path: "userGroupTrack", select: "name" });
  const pagination = await getAllStudent.getPaginationInfo();

  return {
    pagination,
    student,
  };
};

export const TeacherService = {
  getAllMyStudent,
};
