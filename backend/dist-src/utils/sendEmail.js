"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var sendEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options) {
    var transporter, message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transporter = _nodemailer["default"].createTransport({
              host: process.env.SMTP_HOST,
              port: process.env.SMTP_PORT,
              auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
              }
            });
            message = {
              from: "".concat(process.env.SMTP_FROM_NAME, " <").concat(process.env.SMTP_FROM_EMAIL, ">"),
              to: options.email,
              subject: options.subject,
              text: options.message
            };
            _context.next = 4;
            return transporter.sendMail(message);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = sendEmail;
exports["default"] = _default;