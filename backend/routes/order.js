import express from 'express';
import { 
    newOrder,
    allOrders,
    myOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder 
} from './../controllers/orderController';
import { authorizeRoles, isAuthenticatedUser } from './../middlewares/auth';

const router = express.Router();

router.route('/orders/new').post(isAuthenticatedUser, newOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/admin/orders')
      .get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/order/:id')
      .get(isAuthenticatedUser, authorizeRoles('admin'), getSingleOrder)
      .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
      .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

export default router;