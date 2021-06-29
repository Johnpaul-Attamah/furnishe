"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _profileController = require("./../controllers/profileController");

var _auth = require("./../middlewares/auth");

var router = _express["default"].Router();

router.route('/me').get(_auth.isAuthenticatedUser, _profileController.getUserProfile);
router.route('/me/update').put(_auth.isAuthenticatedUser, _profileController.updateProfile);
router.route('/password/update').put(_auth.isAuthenticatedUser, _profileController.updatePassword);
router.route('/admin/users').get(_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _profileController.allUsers);
router.route('/admin/user/:id').get(_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _profileController.getUserDetails).put(_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _profileController.updateUser)["delete"](_auth.isAuthenticatedUser, (0, _auth.authorizeRoles)('admin'), _profileController.deleteUser);
var _default = router;
exports["default"] = _default;