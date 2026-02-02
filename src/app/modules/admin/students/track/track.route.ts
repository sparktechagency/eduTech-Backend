import express from 'express';
import { TrackController } from './track.controller';
import { USER_ROLES } from '../../../../../enums/user';
import auth from '../../../../middlewares/auth';


const router = express.Router();
router.route('/')
    .post(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        TrackController.create
    )
    .get(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        TrackController.getAll
    );

router.route('/:id')
    .get(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        TrackController.getById
    )
    .patch(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        TrackController.update  
    )
    .delete(
        auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
        TrackController.remove
    );

export const TrackRoutes = router;