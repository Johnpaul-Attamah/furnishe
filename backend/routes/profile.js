import express from 'express';
import { 
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser
} from './../controllers/profileController';
import { isAuthenticatedUser, authorizeRoles } from './../middlewares/auth';

const router = express.Router();

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);


router.route('/admin/users')
.get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router.route('/admin/user/:id')
      .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
      .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
      .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;
