import express from 'express';

import { USER_ROLES } from '../../../../enums/user';
import { mentorTimeTrack } from './time.controller';
import { TimeTrackValidation } from './time.validation';
import auth from '../../../middlewares/auth';
import validateRequest from '../../../middlewares/validateRequest';



const router = express.Router();

router.route("/")
    .get(
        auth(USER_ROLES.MENTOR),
        mentorTimeTrack.getAllTimeTracks
    )
    .post(
        auth(USER_ROLES.MENTOR),
        validateRequest(TimeTrackValidation.createTimeValidationZodSchema),
        mentorTimeTrack.createTimeTrack
    );

router.route("/:id")
    .get(
        // auth(USER_ROLES.MENTOR),
        mentorTimeTrack.getMentorTimeTracks
    )
    .patch(
        auth(USER_ROLES.MENTOR),
        validateRequest(TimeTrackValidation.updateTimeValidationZodSchema),
        mentorTimeTrack.updateTimeTrack
    )
    .delete(
        auth(USER_ROLES.MENTOR),
        mentorTimeTrack.deleteTimeTrack
    );



export const MentorTimeTrackRoutes = router;