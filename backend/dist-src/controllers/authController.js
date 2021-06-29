"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.forgotPassword = exports.logOut = exports.loginUser = exports.registerUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _crypto = _interopRequireDefault(require("crypto"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _User = _interopRequireDefault(require("./../models/User"));

var _errorHandler = _interopRequireDefault(require("./../utils/errorHandler"));

var _catchAsyncErrors = _interopRequireDefault(require("./../middlewares/catchAsyncErrors"));

var _jwtToken = _interopRequireDefault(require("./../utils/jwtToken"));

var _sendEmail = _interopRequireDefault(require("./../utils/sendEmail"));

/**
 * Register a User
 * @async route => /api/v1/register
 * @function registerUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
var registerUser = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var result, _req$body, name, email, password, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _cloudinary["default"].v2.uploader.upload(req.body.avatar, {
              folder: 'furnishe/avatars',
              width: 150,
              crop: 'scale'
            });

          case 2:
            result = _context.sent;
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
            _context.next = 6;
            return _User["default"].create({
              name: name,
              email: email,
              password: password,
              avatar: {
                public_id: result.public_id,
                url: result.secure_url
              }
            });

          case 6:
            user = _context.sent;
            (0, _jwtToken["default"])(user, 201, res);

          case 8:
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
 * Login a User
 * Get the login details from the request body
 * check if email exists
 * check if password match
 * login user
 * @async route => /api/v1/login
 * @function loginUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */

exports.registerUser = registerUser;
var loginUser = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body2, email, password, user, isPasswordMatched;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

            if (!(!email || !password)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", next(new _errorHandler["default"]('Please Enter a valid Email and password', 400)));

          case 3:
            _context2.next = 5;
            return _User["default"].findOne({
              email: email
            }).select('+password');

          case 5:
            user = _context2.sent;

            if (user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", next(new _errorHandler["default"]('Invalid Email or password', 401)));

          case 8:
            _context2.next = 10;
            return user.comparePassword(password);

          case 10:
            isPasswordMatched = _context2.sent;

            if (isPasswordMatched) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", next(new _errorHandler["default"]('Invalid Email or Password', 401)));

          case 13:
            (0, _jwtToken["default"])(user, 200, res);

          case 14:
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
 * Log out a user
 * @async route => /api/v1/logout
 * @function logOut
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */

exports.loginUser = loginUser;
var logOut = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res.cookie('token', null, {
              expires: new Date(Date.now()),
              httpOnly: true
            });
            res.status(200).json({
              success: true,
              message: 'logged out'
            });

          case 2:
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
 * Send password recovery email
 * check if input email exists
 * generate reset token and save in database
 * create reset password url for email
 * create message body for email
 * send the email
 * @async route => /api/v1/password/forgot
 * @function forgotPassword
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} email successfully sent
 */

exports.logOut = logOut;
var forgotPassword = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var user, resetToken, resetUrl, message;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 2:
            user = _context4.sent;

            if (user) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler["default"]('user email not found', 404)));

          case 5:
            resetToken = user.getResetPasswordToken();
            _context4.next = 8;
            return user.save({
              validateBeforeSave: false
            });

          case 8:
            resetUrl = "".concat(req.protocol, "://").concat(req.get('host'), "/password/reset/").concat(resetToken);
            message = "Your password reset token is as follows: \n\n".concat(resetUrl, "\n\n if you have not requested this email, please ignore it.");
            _context4.prev = 10;
            _context4.next = 13;
            return (0, _sendEmail["default"])({
              email: user.email,
              subject: 'furnishe password recovery',
              message: message
            });

          case 13:
            res.status(200).json({
              success: true,
              message: "Email sent to ".concat(user.email)
            });
            _context4.next = 23;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](10);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            _context4.next = 22;
            return user.save({
              validateBeforeSave: false
            });

          case 22:
            return _context4.abrupt("return", next(new _errorHandler["default"](_context4.t0.message, 500)));

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[10, 16]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
/**
 * Reset password
 * hash URI token
 * find the reset password token in the database and check if expired 
 * compare password in the request body
 * setup new password
 * send jwt token
 * @async route => /api/v1/password/reset/:token
 * @function resetPassword
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} email successfully sent
 */

exports.forgotPassword = forgotPassword;
var resetPassword = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var resetPasswordToken, user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            resetPasswordToken = _crypto["default"].createHash('sha256').update(req.params.token).digest('hex');
            _context5.next = 3;
            return _User["default"].findOne({
              resetPasswordToken: resetPasswordToken,
              resetPasswordExpire: {
                $gt: Date.now()
              }
            });

          case 3:
            user = _context5.sent;

            if (user) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", next(new _errorHandler["default"]('Password reset token is invalid or expired', 400)));

          case 6:
            if (!(req.body.password !== req.body.confirmPassword)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", next(new _errorHandler["default"]('passwords does not match', 400)));

          case 8:
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            _context5.next = 13;
            return user.save();

          case 13:
            (0, _jwtToken["default"])(user, 200, res);

          case 14:
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
exports.resetPassword = resetPassword;