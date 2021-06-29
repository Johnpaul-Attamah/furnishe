"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var database_domain;

if (process.env.NODE_ENV === 'development') {
  database_domain = process.env.DB_LOCAL_URI;
}

if (process.env.NODE_ENV === 'production') {
  database_domain = process.env.DB_URI;
}

var connectDatabase = function connectDatabase() {
  _mongoose["default"].connect(database_domain, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(function (con) {
    console.log("Mongodb Database connected with Host: ".concat(con.connection.host));
  });
};

var _default = connectDatabase;
exports["default"] = _default;