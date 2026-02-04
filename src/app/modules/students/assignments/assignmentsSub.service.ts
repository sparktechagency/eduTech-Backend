import { IAssignmentsSub } from './assignmentsSub.interface';
import { AssignmentsSub } from './assignmentsSub.model';

const submitAssignmentIntoDB = async (payload: IAssignmentsSub) => {
  const result = await AssignmentsSub.create(payload);
  return result;
};

const getSubmissionsForTeacherFromDB = async (assignmentId: string) => {
  const result = await AssignmentsSub.find({ assignmentId })
    .populate('studentId')
    .populate('assignmentId');
  return result;
};

const getStudentOwnSubmissionsFromDB = async (studentId: string) => {
  const result = await AssignmentsSub.find({ studentId })
    .populate('assignmentId');
  return result;
};

export const AssignmentsSubService = {
  submitAssignmentIntoDB,
  getSubmissionsForTeacherFromDB,
  getStudentOwnSubmissionsFromDB,
};