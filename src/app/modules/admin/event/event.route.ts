import express from 'express';
import auth from '../../../middlewares/auth';
import { USER_ROLES } from '../../../../enums/user';
import validateRequest from '../../../middlewares/validateRequest';
import { EventValidation } from './event.validation';
import { EventController } from './event.controller';
import fileUploadHandler from '../../../middlewares/fileUploaderHandler';


const router = express.Router();

router.route("/")
.get(
        // auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        EventController.getAllEvents
    )   
.post(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN
        ),
        fileUploadHandler(),
        // validateRequest(EventValidation.createEventValidationZodSchema),
        EventController.createEvent
    );


router.route("/:id")
    .get(
        // auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        EventController.getEventById
    )
    .patch(
        fileUploadHandler(),
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN
        ),
        validateRequest(EventValidation.updateEventValidationZodSchema),
        EventController.updateEventById
    )
    .delete(
        auth(
            USER_ROLES.ADMIN, 
            USER_ROLES.SUPER_ADMIN
        ),
        EventController.deleteEventById
    );

export const EventRoutes = router;