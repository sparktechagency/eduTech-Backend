import { Router } from 'express';
import auth from '../../../middlewares/auth';
import { USER_ROLES } from '../../../../enums/user';
import { mentorDashboardController } from './dashboard.controller';


const router = Router();

router.get(
    '',
    auth(USER_ROLES.MENTOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    mentorDashboardController.getMentorDashboardData
);
router.get(
    '/student',
    auth(USER_ROLES.MENTOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    mentorDashboardController.getMentorStudentrdWoops
);

router.get(
    '/upcoming',
    auth(USER_ROLES.MENTOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    mentorDashboardController.getUpcomingSessions
);



export const mentorDashboardRoutes = router;