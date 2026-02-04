
import { USER_ROLES } from '../../../../enums/user';
import auth from '../../../middlewares/auth'
import express from 'express';
import { AssignmentsSubController } from './assignmentsSub.controller';
import fileUploadHandler from '../../../middlewares/fileUploaderHandler';



const router = express.Router();
router.route("/my-submissions")
    .get(
        auth(USER_ROLES.STUDENT),
        AssignmentsSubController.getMySubmissions //student view own submissions
    );
router.route("/:assignmentId")
  
    .get(
        auth(USER_ROLES.STUDENT),
        AssignmentsSubController.getAssignmentSubmissions //teacher view submissions from assignmentId
    )
    .post(
            auth(USER_ROLES.STUDENT),
            fileUploadHandler(),
            AssignmentsSubController.submitAssignment
        )


export const AssignmentSubRoutes = router;