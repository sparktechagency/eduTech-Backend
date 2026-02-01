import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserGroupController } from './user-group.controller';
import { UserGroupTrackRoutes } from './user-group-track/user-group-track.route';
const router = express.Router();

//user group track
router.use('/tracks', UserGroupTrackRoutes);

//user group
router
    .route('/')
     //! Role only ADMIN, SUPER_ADMIN => USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN
    .post(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.STUDENT), UserGroupController.createUserGroup)
    .get(UserGroupController.getAllUserGroups);

router
    .route('/:id')
    .get(UserGroupController.getUserGroupById)
     //! Role only ADMIN, SUPER_ADMIN => USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN
    .patch(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN,USER_ROLES.STUDENT), UserGroupController.updateUserGroup)
     //! Role only ADMIN, SUPER_ADMIN => USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN
    .delete(auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.STUDENT), UserGroupController.deleteUserGroup);

export const UserGroupRoutes = router;
