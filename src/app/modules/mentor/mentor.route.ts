import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { mentorWeeklyReport } from './report/report.controller';
import { mentorTimeTrack } from './timeTrack/time.controller';
import { ReportValidation } from './report/report.validation';


const router = express.Router();

// report
router.route("/")
    .post(
        auth(USER_ROLES.MENTOR),
        validateRequest(ReportValidation.createWeeklyReportZodSchema),
        mentorWeeklyReport.createWeeklyReport
    )
    .get(
        
        mentorWeeklyReport.getAllReports
    );

router.route("/:id")
    .get(
       
        mentorWeeklyReport.getStudentReports
    )

    .patch(
        auth(USER_ROLES.MENTOR),
        validateRequest(ReportValidation.updateWeeklyReportZodSchema),
        mentorWeeklyReport.updateWeeklyReport
    )
    .delete(
        auth(USER_ROLES.MENTOR),
        mentorWeeklyReport.deleteWeeklyReport
    );

// time track
router.route("/time-track")
    .post(
        auth(USER_ROLES.MENTOR),
        mentorTimeTrack.createTimeTrack
    )
    .get(
        auth(USER_ROLES.MENTOR),
        mentorTimeTrack.getAllTimeTracks
    );

router.route("/time-track/:id")
    .get(
        // auth(USER_ROLES.MENTOR),
        mentorTimeTrack.getMentorTimeTracks
    );

export const MentorRoutes = router;