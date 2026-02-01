import express from "express";
import { AttendanceController } from "./attendance.controller";
import { USER_ROLES } from "../../../../../enums/user";
import auth from "../../../../middlewares/auth";
const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        AttendanceController.saveAttendance
    )
    .get(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        AttendanceController.getAttendance
    );

export const AttendenceRoutes = router;