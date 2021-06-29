"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(func) {
  return function (req, res, next) {
    return Promise.resolve(func(req, res, next))["catch"](next);
  };
};

exports["default"] = _default;