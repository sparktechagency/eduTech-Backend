import express from 'express';
import { USER_ROLES } from '../../../../enums/user';
import excelUploadHandler from '../../../middlewares/excelUploadHandler';
import { adminTeacherController } from './teacher.controller';
import auth from '../../../middlewares/auth';


const router = express.Router();
router.route("/")
    .post(
        excelUploadHandler(),
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN
        ),
        adminTeacherController.bulkUploadTeachers
    )
    .get(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN
        ),
        adminTeacherController.getAllTeachers
    );

router.route("/:id")
    .get(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN, 
            USER_ROLES.TEACHER, 
            USER_ROLES.MENTOR, 
            USER_ROLES.STUDENT
        ),
        adminTeacherController.getTeacherById
    )
    .patch(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN
        ),
        adminTeacherController.updateTeacher
    )
    .delete(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN
        ),
        adminTeacherController.deleteTeacher
    );

export const adminTeacherRoutes = router;