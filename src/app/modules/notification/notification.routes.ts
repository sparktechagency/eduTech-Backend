import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { NotificationController } from './notification.controller';
const router = express.Router();

router.get('/',
    auth(USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.MENTOR, USER_ROLES.COORDINATOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    NotificationController.getNotificationFromDB
);
router.get('/mentor',
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.MENTOR),
    NotificationController.adminNotificationFromDB
);
router.patch('/',
    auth(USER_ROLES.STUDENT, USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.MENTOR, USER_ROLES.COORDINATOR, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    NotificationController.readNotification
);
router.patch('/admin',
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.MENTOR),
    NotificationController.adminReadNotification
);

export const NotificationRoutes = router;
