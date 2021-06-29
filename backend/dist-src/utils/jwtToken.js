"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var sendToken = function sendToken(user, statusCode, res) {
  //Create token
  var token = user.getJwtToken(); //cookie options

  var options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    httpOnly: true
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token: token,
    user: user
  });
};

var _default = sendToken;
exports["default"] = _default;