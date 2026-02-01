import express from 'express';
import { USER_ROLES } from '../../../../enums/user';
import auth from '../../../middlewares/auth';
import { UserGroupTrackController } from './user-group-track.controller';

const router = express.Router();

router
  .route('/')
  .post(
    //! Role only ADMIN, SUPER_ADMIN => USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.STUDENT),
    UserGroupTrackController.createUserGroupTrack
  )
  .get(UserGroupTrackController.getAllUserGroupTracks);

router.get('/group/:userGroupId', UserGroupTrackController.getTracksByUserGroup);

router
  .route('/:id')
  .get(UserGroupTrackController.getUserGroupTrackById)
  .patch(
    //! Role only ADMIN, SUPER_ADMIN => USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.STUDENT),
    UserGroupTrackController.updateUserGroupTrack
  )
  .delete(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.STUDENT),
    UserGroupTrackController.deleteUserGroupTrack
  );

export const UserGroupTrackRoutes = router;
