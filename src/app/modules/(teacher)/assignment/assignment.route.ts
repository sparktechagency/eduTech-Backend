import express from "express";
import { USER_ROLES } from "../../../../enums/user";
import auth from "../../../middlewares/auth";
import fileUploadHandler from "../../../middlewares/fileUploaderHandler";
import { AssignmentController } from "./assignment.controller";
import { AssignmentsSubController } from "../../students/assignments/assignmentsSub.controller";

const router = express.Router();

router
  .route("/")
  .post(
    fileUploadHandler(),
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.TEACHER),
    AssignmentController.createAssignment,
  )
  .get(
    auth(
      USER_ROLES.ADMIN,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.TEACHER,
      USER_ROLES.STUDENT,
    ),
    AssignmentController.getAllAssignments,
  );

router
  .route("/:id")
  .get(
    auth(
      USER_ROLES.ADMIN,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.TEACHER,
      USER_ROLES.STUDENT,
    ),
    AssignmentController.getAssignmentById,
  )
  .patch(
    fileUploadHandler(),
    auth(
      USER_ROLES.ADMIN,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.TEACHER),
    AssignmentController.updateAssignment,
  )
  .delete(
    auth(
      USER_ROLES.ADMIN,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.TEACHER
    ),
    AssignmentController.deleteAssignment,
  );

router
  .route("/:assignmentId/submissions")
  .get(
    auth(
      USER_ROLES.ADMIN,
      USER_ROLES.SUPER_ADMIN,
      USER_ROLES.TEACHER,
      USER_ROLES.STUDENT,
    ),
    AssignmentsSubController.getAssignmentSubmissions, // Teacher view submissions from assignmentId
  );
  
router
  .route("/submit/:assignmentId")
  .post(
    auth(USER_ROLES.TEACHER, USER_ROLES.MENTOR, USER_ROLES.STUDENT, USER_ROLES.COORDINATOR, USER_ROLES.SUPER_ADMIN),
    fileUploadHandler(),
    AssignmentsSubController.submitAssignment,
  );

router
  .route("/marks/:submissionId")
  .post(
    auth(USER_ROLES.TEACHER, USER_ROLES.MENTOR, USER_ROLES.SUPER_ADMIN),
    AssignmentController.addmarksAndFeedbackToSubmission,
  );


export const AssignmentRoutes = router;
