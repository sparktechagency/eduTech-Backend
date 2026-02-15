import express from "express";
import { goalController } from "./goal.controller";
import auth from "../../../middlewares/auth";
import { USER_ROLES } from "../../../../enums/user";
import validateRequest from "../../../middlewares/validateRequest";
import { GoalValidation } from "./goal.validation";

const router = express.Router();

router.route("/")
    .post(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN, 
            USER_ROLES.MENTOR
        ),
        validateRequest(GoalValidation.createZodSchema),
        goalController.createGoal
    )
    .get(
        goalController.getAllGoals
    );

router.route("/:id")
    .get(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN, 
            USER_ROLES.MENTOR
        ),
        goalController.getGoalById
    )
    .patch(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN, 
            USER_ROLES.MENTOR
        ),
        validateRequest(GoalValidation.updateZodSchema),
        goalController.updateGoal
    )
    .delete(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN, 
            USER_ROLES.MENTOR
        ),
        goalController.deleteGoal
    );

export const goalRoutes = router;