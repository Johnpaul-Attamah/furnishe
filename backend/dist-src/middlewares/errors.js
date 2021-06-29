"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _errorHandler = _interopRequireDefault(require("./../utils/errorHandler"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(err, req, res, next) {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack
    });
  }

  if (process.env.NODE_ENV === 'production') {
    var error = _objectSpread({}, err);

    error.message = err.message; //wrong mongoose objectId error

    if (err.name === 'CastError') {
      var message = "Resource not found. Invalid ".concat(err.path);
      error = new _errorHandler["default"](message, 400);
    } //validation errors


    if (err.name === 'validationError') {
      var _message = Object.values(err.errors).map(function (value) {
        return value.message;
      });

      error = new _errorHandler["default"](_message, 400);
    } //Mongoose Duplicate key errors


    if (err.code === 11000) {
      var _message2 = "".concat(Object.keys(err.keyValue), " exists");

      error = new _errorHandler["default"](_message2, 400);
    } //Wrong Jwt error


    if (err.name === 'JsonWebTokenError') {
      var _message3 = "Invalid Token!!";
      error = new _errorHandler["default"](_message3, 400);
    } //Expired Jwt error


    if (err.name === 'TokenExpiredError') {
      var _message4 = 'Token expired. login to continue...';
      error = new _errorHandler["default"](_message4, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

exports["default"] = _default;