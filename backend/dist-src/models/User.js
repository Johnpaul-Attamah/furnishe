"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _validator = _interopRequireDefault(require("validator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _crypto = _interopRequireDefault(require("crypto"));

var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    maxlength: [30, 'Your name cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
    validate: [_validator["default"].isEmail, 'Invalid Email Address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be longer than 6 characters'],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    "default": 'User'
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});
/**
 * Encrypt password before saving to database
 * @async
 * @function
 * @param {object} next
 */

UserSchema.pre('save', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.isModified('password')) {
              next();
            }

            _context.next = 3;
            return _bcryptjs["default"].hash(this.password, 10);

          case 3:
            this.password = _context.sent;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * check password match
 * @method comparePassword
 */

UserSchema.methods.comparePassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(inputPassword) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].compare(inputPassword, this.password);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Generate token for Jwt
 * @method getJwtToken
 */


UserSchema.methods.getJwtToken = function () {
  return _jsonwebtoken["default"].sign({
    id: this._id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });
};
/**
 * generatepassword reset token
 * @method getResetPasswordToken
 */


UserSchema.methods.getResetPasswordToken = function () {
  var resetToken = _crypto["default"].randomBytes(20).toString('hex');

  this.resetPasswordToken = _crypto["default"].createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

var _default = _mongoose["default"].model('User', UserSchema);

exports["default"] = _default;