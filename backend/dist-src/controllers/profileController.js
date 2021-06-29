"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.getUserDetails = exports.allUsers = exports.updateProfile = exports.updatePassword = exports.getUserProfile = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _User = _interopRequireDefault(require("./../models/User"));

var _errorHandler = _interopRequireDefault(require("./../utils/errorHandler"));

var _catchAsyncErrors = _interopRequireDefault(require("./../middlewares/catchAsyncErrors"));

var _jwtToken = _interopRequireDefault(require("./../utils/jwtToken"));

/**
 * Get Loggedin user details/profile
 * @async route => /api/v1/me
 * @function getUserProfile
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
var getUserProfile = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _User["default"].findById(req.user.id);

          case 2:
            user = _context.sent;
            res.status(200).json({
              success: true,
              user: user
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * Update password of logged in user
 * get user by id
 * check previous user password
 * @async route => /api/v1/password/update
 * @function updatePassword
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */

exports.getUserProfile = getUserProfile;
var updatePassword = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var user, isMatched;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _User["default"].findById(req.user.id).select('+password');

          case 2:
            user = _context2.sent;
            _context2.next = 5;
            return user.comparePassword(req.body.oldPassword);

          case 5:
            isMatched = _context2.sent;

            if (isMatched) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", next(new _errorHandler["default"]('password is incorrect', 400)));

          case 8:
            user.password = req.body.password;
            _context2.next = 11;
            return user.save();

          case 11:
            (0, _jwtToken["default"])(user, 200, res);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
/**
 * Update profile of logged in user
 * get user from input
 * find user by id and update data
 * @async route => /api/v1/me/update
 * @function updateProfile
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */

exports.updatePassword = updatePassword;
var updateProfile = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var newUser, _user, image_id, _res, result, user;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            newUser = {
              name: req.body.name,
              email: req.body.email
            };
            /** Update avatar*/

            if (!(req.body.avatar !== '')) {
              _context3.next = 13;
              break;
            }

            _context3.next = 4;
            return _User["default"].findById(req.user.id);

          case 4:
            _user = _context3.sent;
            image_id = _user.avatar.public_id;
            _context3.next = 8;
            return _cloudinary["default"].v2.uploader.destroy(image_id);

          case 8:
            _res = _context3.sent;
            _context3.next = 11;
            return _cloudinary["default"].v2.uploader.upload(req.body.avatar, {
              folder: 'furnishe/avatars',
              width: 150,
              crop: 'scale'
            });

          case 11:
            result = _context3.sent;
            newUser.avatar = {
              public_id: result.public_id,
              url: result.secure_url
            };

          case 13:
            _context3.next = 15;
            return _User["default"].findByIdAndUpdate(req.user.id, newUser, {
              "new": true,
              runValidators: true,
              useFindAndModify: false
            });

          case 15:
            user = _context3.sent;
            res.status(200).json({
              success: true
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
/**
 *#################################################################
 *#################################################################
 ***********************ADMIN Routes*******************************
 *#################################################################
 *#################################################################
 */

/**
 * GET ALL USERS
 * @async route => /api/v1/admin/users
 * @function allUsers
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */

exports.updateProfile = updateProfile;
var allUsers = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var users;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _User["default"].find();

          case 2:
            users = _context4.sent;

            if (users) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler["default"]('No users yet', 404)));

          case 5:
            res.status(200).json({
              success: true,
              users: users
            });

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
/**
 * GET A USER DETAIL
 * @async route => /api/v1/admin/user/:id
 * @function getUserDetails
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */

exports.allUsers = allUsers;
var getUserDetails = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _User["default"].findById(req.params.id);

          case 2:
            user = _context5.sent;

            if (user) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", next(new _errorHandler["default"]("user not found with id ".concat(req.params.id), 404)));

          case 5:
            res.status(200).json({
              success: true,
              user: user
            });

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
/**
 * Update user
 * @async route => /api/v1/admin/user/:id
 * @function updateUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */

exports.getUserDetails = getUserDetails;
var updateUser = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var newUserData, user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            newUserData = {
              name: req.body.name,
              email: req.body.email,
              role: req.body.role
            };
            _context6.next = 3;
            return _User["default"].findByIdAndUpdate(req.params.id, newUserData, {
              "new": true,
              runValidators: true,
              useFindAndModify: false
            });

          case 3:
            user = _context6.sent;
            res.status(200).json({
              success: true
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
/**
 * DELETE A USER
 * @async route => /api/v1/admin/user/:id
 * @function deleteUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */

exports.updateUser = updateUser;
var deleteUser = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var user, image_id;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _User["default"].findById(req.params.id);

          case 2:
            user = _context7.sent;

            if (user) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt("return", next(new _errorHandler["default"]("user with id ".concat(req.param.id, " not found"), 404)));

          case 5:
            //Remove avatar
            image_id = user.avatar.public_id;
            _context7.next = 8;
            return _cloudinary["default"].v2.uploader.destroy(image_id);

          case 8:
            _context7.next = 10;
            return user.remove();

          case 10:
            res.status(200).json({
              success: true
            });

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}());
exports.deleteUser = deleteUser;