import express from 'express';
import { USER_ROLES } from '../../../../enums/user';
import excelUploadHandler from '../../../middlewares/excelUploadHandler';
import { adminTeacherController } from '../teacher/teacher.controller';
import auth from '../../../middlewares/auth';
import { OnboardingController } from './onboarding.controller';


const router = express.Router();
router.route("/")
    .post(
        auth(USER_ROLES.STUDENT, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.MENTOR),
        OnboardingController.createOnboarding
    )
    .get(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.STUDENT, USER_ROLES.MENTOR),
        OnboardingController.getOnboarding
    );

router.route("/:id")
    .get(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.STUDENT, USER_ROLES.MENTOR),
        OnboardingController.getOnboardingById
    )
    // .patch(
    //     auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    //     OnboardingController.updateOnboarding
    // )

export const AdminOnboardingRoutes = router;