import express from "express";
import { mentorLearningMaterial } from "./learning.controller";
import auth from "../../../middlewares/auth";
import { USER_ROLES } from "../../../../enums/user";



const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.MENTOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.TEACHER),
        mentorLearningMaterial.createResource
    )
    .get(
        mentorLearningMaterial.getAllResources
    );

router.route("/:id")
    .get(
        auth(USER_ROLES.MENTOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.TEACHER),
        mentorLearningMaterial.getCreatedByResources
    )
    .patch(
        auth(USER_ROLES.MENTOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.TEACHER),
        mentorLearningMaterial.updateResource
    )
    .delete(
        auth(USER_ROLES.MENTOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.TEACHER),
        mentorLearningMaterial.deleteResource
    );
    
router.route("/resource/:id")
    .get(
        mentorLearningMaterial.getResourceById
    );
router.route("/filtered")
    .get(
        mentorLearningMaterial.getFilteredResources
    );
export const LearningMaterialRoutes = router;