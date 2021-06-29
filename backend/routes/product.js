import express from 'express';
import { 
    newProduct, 
    getProducts,
    getAdminProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReview ,
    deleteProductReview
} from './../controllers/productController';
import { authorizeRoles, isAuthenticatedUser } from './../middlewares/auth';

const router = express.Router();

router.route('/product/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/products').get(getProducts);
router.route('/admin/products')
      .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/products/:id').get(getSingleProduct)
      .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
      .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/reviews').put(isAuthenticatedUser, createProductReview)
      .get(isAuthenticatedUser, getProductReview)
      .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProductReview);
    


export default router;