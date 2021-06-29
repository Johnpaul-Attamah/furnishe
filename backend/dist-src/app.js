"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _path = _interopRequireDefault(require("path"));

var _auth = _interopRequireDefault(require("./routes/auth"));

var _payment = _interopRequireDefault(require("./routes/payment"));

var _profile = _interopRequireDefault(require("./routes/profile"));

var _product = _interopRequireDefault(require("./routes/product"));

var _order = _interopRequireDefault(require("./routes/order"));

var _errors = _interopRequireDefault(require("./middlewares/errors"));

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
app.use((0, _expressFileupload["default"])());
app.use('/api/v1', _auth["default"]);
app.use('/api/v1', _profile["default"]);
app.use('/api/v1', _product["default"]);
app.use('/api/v1', _order["default"]);
app.use('/api/v1', _payment["default"]);

if (process.env.NODE_ENV === 'production') {
  app.use(_express["default"]["static"](_path["default"].join(__dirname, '../../frontend/build')));
  app.get('*', function (req, res) {
    res.sendFile(_path["default"].resolve(__dirname, '../../frontend/build/index.html'));
  });
}

app.use(_errors["default"]);
var _default = app;
exports["default"] = _default;