import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import QueryBuilder from "../../../shared/apiFeature";


const getAllMyStudent = async (user: JwtPayload, query: Record<string, any>) => {
  const getAllStudent = new QueryBuilder(
    User.find({ role: "STUDENT"}),
    query
  )
    .search(['name', 'email'])
    .filter()
    .paginate();

  const student = await getAllStudent.queryModel;
  const pagination = await getAllStudent.getPaginationInfo();

  return {
    pagination,
    student,
  };
};



export const TeacherService = {
    getAllMyStudent
}

