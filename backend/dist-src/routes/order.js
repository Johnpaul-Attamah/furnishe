"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderController = require("./../controllers/orderController");

var _auth = require("./../middlewares/auth");

var router = _express["default"].Router();

router.route('/orders/new').post(_auth.isAuthenticatedUser, _orderController.newOrder);
router.route('/orders/me').get(_auth.isAuthenticatedUser, _orderController.myOrders);
router.route('/admin/orders').get(_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _orderController.allOrders);
router.route('/order/:id').get(_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _orderController.getSingleOrder).put(_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _orderController.updateOrder)["delete"](_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _orderController.deleteOrder);
var _default = router;
exports["default"] = _default;