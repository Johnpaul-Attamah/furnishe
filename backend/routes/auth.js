import express from 'express';
import { 
    registerUser, 
    loginUser, 
    logOut, 
    forgotPassword,
    resetPassword
} from '../controllers/authController';

const router = express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logOut);

export default router;