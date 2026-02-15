import express from 'express';
import { USER_ROLES } from '../../../../enums/user';
import auth from '../../../middlewares/auth';
import { RecentActivityController } from './recentActivity.controller';

const router = express.Router();

router
  .route('/')
  .post(
    auth(
      USER_ROLES.ADMIN, 
      USER_ROLES.SUPER_ADMIN, 
      USER_ROLES.TEACHER
    ),
    RecentActivityController.createRecentActivity
  )
  .get(
    auth(
      USER_ROLES.ADMIN, 
      USER_ROLES.SUPER_ADMIN, 
      USER_ROLES.TEACHER, 
      USER_ROLES.STUDENT
    ),
    RecentActivityController.getAllRecentActivities
  );

router
  .route('/:id')
  .get(
    auth(
      USER_ROLES.ADMIN, 
      USER_ROLES.SUPER_ADMIN, 
      USER_ROLES.TEACHER, 
      USER_ROLES.STUDENT
    ),
    RecentActivityController.getRecentActivityById
  )
  .patch(
    auth(
      USER_ROLES.ADMIN, 
      USER_ROLES.SUPER_ADMIN, 
      USER_ROLES.TEACHER
    ),
    RecentActivityController.updateRecentActivity
  )
  .delete(
    auth(
      USER_ROLES.ADMIN, 
      USER_ROLES.SUPER_ADMIN, 
      USER_ROLES.TEACHER
    ),
    RecentActivityController.deleteRecentActivity
  );

export const RecentActivityRoutes = router;
