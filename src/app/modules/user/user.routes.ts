import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import fileUploadHandler from '../../middlewares/fileUploaderHandler';
const router = express.Router();

router.get(
    '/profile',
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.COORDINATOR, USER_ROLES.MENTOR,USER_ROLES.STUDENT, USER_ROLES.TEACHER),
    UserController.getUserProfile
);

router.patch('/update-location',
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.COORDINATOR, USER_ROLES.MENTOR,USER_ROLES.STUDENT, USER_ROLES.TEACHER),
    UserController.updateLocation
  );
  
router.post(
    '/create-admin',
    validateRequest(UserValidation.createAdminZodSchema),
    UserController.createAdmin
);

router
    .route('/')
    .post(
        UserController.createUser
    )
    .patch(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.MENTOR, USER_ROLES.STUDENT, USER_ROLES.TEACHER),
        fileUploadHandler(),
        UserController.updateProfile
    );

export const UserRoutes = router;