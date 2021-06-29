"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _app = _interopRequireDefault(require("./app"));

var _database = _interopRequireDefault(require("./config/database"));

process.on('uncaughtException', function (err) {
  console.log("Error: ".concat(err.message));
  console.log('Uncaught exception, shutting down server.');
  process.exit(1);
});

_dotenv["default"].config({
  path: 'backend/config/config.env'
});

(0, _database["default"])();

_cloudinary["default"].config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var server = _app["default"].listen(process.env.PORT, function () {
  return console.log("Server started at: http://127.0.0.1:".concat(process.env.PORT, " in ").concat(process.env.NODE_ENV, " mode\n    "));
});

process.on('unhandledRejection', function (err) {
  console.log("Error: ".concat(err.message));
  console.log('shutting down server');
  server.close(function () {
    process.exit(1);
  });
});