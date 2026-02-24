import { Router } from 'express';
import auth from "../../../middlewares/auth";
import { USER_ROLES } from "../../../../enums/user";
import { StudentStatsController } from './stats.controller';


const router = Router();

router.route("/")
    .get(
        auth(
            USER_ROLES.STUDENT, 
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN, 
            USER_ROLES.MENTOR
        ),
        StudentStatsController.getMystats
    );

router.route('/events')
    .get(
        auth(
            USER_ROLES.STUDENT, 
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN, 
            USER_ROLES.MENTOR
        ),
        StudentStatsController.getUpcomingEvents
    );
router.route('/assignments')
    .get(
        auth(
            USER_ROLES.STUDENT, 
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN, 
            USER_ROLES.MENTOR
        ),
        StudentStatsController.getPendingAssignments
    );

export const StudentStatsRoutes = router;
