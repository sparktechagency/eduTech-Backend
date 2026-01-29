import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { mentorWeeklyReport } from './report/report.controller';


const router = express.Router();

router.route("/")
    .post(
        // auth(USER_ROLES.MENTOR),
        mentorWeeklyReport.createWeeklyReport
    )
    .get(
        // MentorController.getMentors
    );

router.route("/:id")
    .get(
        // MentorController.getSingleMentor
    )
    .patch(
        auth(USER_ROLES.MENTOR),
        // validateRequest(MentorValidation.updateMentorZodSchema),
        // MentorController.updateMentor
    )
    .delete(
        auth(USER_ROLES.MENTOR),
        // MentorController.deleteMentor
    );

export const MentorRoutes = router;