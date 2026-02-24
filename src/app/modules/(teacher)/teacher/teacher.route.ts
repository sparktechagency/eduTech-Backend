import express from 'express';
import { USER_ROLES } from '../../../../enums/user';
import auth from '../../../middlewares/auth';
import { TeacherController } from './teacher.controller';
import { AssignmentsSubController } from '../../students/assignments/assignmentsSub.controller';

const router = express.Router();

router.get(
  '/my-students',
  auth(
    USER_ROLES.TEACHER, 
    USER_ROLES.ADMIN, 
    USER_ROLES.SUPER_ADMIN
  ),
  TeacherController.getAllMyStudent
);

router.get(
  '/all-submitted-assignments',
  auth(
    USER_ROLES.TEACHER, 
    USER_ROLES.ADMIN, 
    USER_ROLES.SUPER_ADMIN
  ),
  AssignmentsSubController.getAllSubmitedAssignments
);

router.get(
  '/overview',
  auth(
    USER_ROLES.TEACHER, 
    USER_ROLES.ADMIN, 
    USER_ROLES.SUPER_ADMIN
  ),
  TeacherController.getOverview
);


export const TeacherRoutes = router;
