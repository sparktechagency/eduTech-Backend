import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CoordinatorController } from './coordinator.controller';


const router = express.Router();

router.route("/resources")
    .get(
        auth(USER_ROLES.COORDINATOR, USER_ROLES.MENTOR),
        CoordinatorController.getAllResources
    );
router.route("/resources/:id")
    .get(
        auth(USER_ROLES.COORDINATOR, USER_ROLES.MENTOR),
        CoordinatorController.getResourceById
    )
    .patch(
        auth(USER_ROLES.COORDINATOR, USER_ROLES.MENTOR),
        CoordinatorController.updateResourceStatus
    );

router.route("/dashboard")
    .get(
        auth(USER_ROLES.COORDINATOR),
        CoordinatorController.getstat
    );
router.route("/classes")
    .get(
        auth(USER_ROLES.COORDINATOR, USER_ROLES.MENTOR),
        CoordinatorController.getAllClasses
    );
router.route("/classes/:id")
    .get(
        auth(USER_ROLES.COORDINATOR, USER_ROLES.MENTOR),
        CoordinatorController.getClassById
    )
    .patch(
        auth(USER_ROLES.COORDINATOR, USER_ROLES.MENTOR),
        CoordinatorController.updateClassStatus
    );

router.route("/mentors")
    .get(
        auth(USER_ROLES.COORDINATOR),
        CoordinatorController.getAllMentors
    );
router.route("/:id")
    .get(
        auth(USER_ROLES.COORDINATOR),
        CoordinatorController.getmentorById
    )
    .patch(
        auth(USER_ROLES.COORDINATOR),
        CoordinatorController.updateMentorStatus
    );


export const CoordinatorRoutes = router;

