
import express from "express";
import { AttendanceController } from "./attendance.controller";
import { USER_ROLES } from "../../../../../enums/user";
import auth from "../../../../middlewares/auth";

const router = express.Router();

// 1. Specific Routes FIRST
router.patch(
    "/update-student-status",
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.MENTOR),
    AttendanceController.updateStudentStatus
);

router.route("/")
    .post(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.MENTOR),
        AttendanceController.saveBatchAttendance
    )
    .get(
        // auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.MENTOR),
        AttendanceController.getAttendance
    );
router.get(
    "/stats/:classId",
    // auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.MENTOR),
    AttendanceController.getAttendanceStats
);

export const AttendenceRoutes = router;
