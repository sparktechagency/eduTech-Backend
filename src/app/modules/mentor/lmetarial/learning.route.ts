import express from "express";
import { mentorLearningMaterial } from "./learning.controller";
import auth from "../../../middlewares/auth";
import { USER_ROLES } from "../../../../enums/user";



const router = express.Router();

router.route("/")
    .post(
        auth(USER_ROLES.MENTOR),
        mentorLearningMaterial.createResource
    )
    .get(
        mentorLearningMaterial.getAllResources
    );

router.route("/:id")
    .get(
        auth(USER_ROLES.MENTOR),
        mentorLearningMaterial.getMentorResources
    )
    .patch(
        auth(USER_ROLES.MENTOR),
        mentorLearningMaterial.updateResource
    )
    .delete(
        auth(USER_ROLES.MENTOR),
        mentorLearningMaterial.deleteResource
    );
router.route("/resource/:id")
    .get(
        mentorLearningMaterial.getResourceById
    );
export const LearningMaterialRoutes = router;