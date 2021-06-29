"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorizeRoles = exports.isAuthenticatedUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _catchAsyncErrors = _interopRequireDefault(require("./catchAsyncErrors"));

var _errorHandler = _interopRequireDefault(require("./../utils/errorHandler"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var isAuthenticatedUser = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.cookies.token;

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next(new _errorHandler["default"]('Login first to access this resource.', 401)));

          case 3:
            decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
            _context.next = 6;
            return _User["default"].findById(decoded.id);

          case 6:
            req.user = _context.sent;
            next();

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
exports.isAuthenticatedUser = isAuthenticatedUser;

var authorizeRoles = function authorizeRoles() {
  for (var _len = arguments.length, roles = new Array(_len), _key = 0; _key < _len; _key++) {
    roles[_key] = arguments[_key];
  }

  return function (req, res, next) {
    if (!roles.includes(req.user.role)) return next(new _errorHandler["default"]("Role (".concat(req.user.role, ") is not allowed to access this resource"), 403));
    next();
  };
};

exports.authorizeRoles = authorizeRoles;