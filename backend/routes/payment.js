import express from 'express';
import { isAuthenticatedUser } from './../middlewares/auth';
import { processPayment, sendStripApi } from './../controllers/paymentController';


const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

export default router;