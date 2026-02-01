import express from 'express';
import { USER_ROLES } from '../../../../enums/user';
import auth from '../../../middlewares/auth';
import { TeacherController } from './teacher.controller';

const router = express.Router();

router.get(
  '/my-students',
  auth(USER_ROLES.TEACHER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  TeacherController.getAllMyStudent
);


export const TeacherRoutes = router;
