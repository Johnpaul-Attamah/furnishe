"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productController = require("./../controllers/productController");

var _auth = require("./../middlewares/auth");

var router = _express["default"].Router();

router.route('/product/new').post(_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _productController.newProduct);
router.route('/products').get(_productController.getProducts);
router.route('/admin/products').get(_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _productController.getAdminProducts);
router.route('/products/:id').get(_productController.getSingleProduct).put(_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _productController.updateProduct)["delete"](_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _productController.deleteProduct);
router.route('/reviews').put(_auth.isAuthenticatedUser, _productController.createProductReview).get(_auth.isAuthenticatedUser, _productController.getProductReview)["delete"](_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _productController.deleteProductReview);
var _default = router;
exports["default"] = _default;