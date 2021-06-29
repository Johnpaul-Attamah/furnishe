"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("./../middlewares/auth");

var _paymentController = require("./../controllers/paymentController");

var router = _express["default"].Router();

router.route('/payment/process').post(_auth.isAuthenticatedUser, _paymentController.processPayment);
router.route('/stripeapi').get(_auth.isAuthenticatedUser, _paymentController.sendStripApi);
var _default = router;
exports["default"] = _default;