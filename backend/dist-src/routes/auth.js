"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = require("../controllers/authController");

var router = _express["default"].Router();

router.route('/register').post(_authController.registerUser);
router.route('/login').post(_authController.loginUser);
router.route('/password/forgot').post(_authController.forgotPassword);
router.route('/password/reset/:token').put(_authController.resetPassword);
router.route('/logout').get(_authController.logOut);
var _default = router;
exports["default"] = _default;