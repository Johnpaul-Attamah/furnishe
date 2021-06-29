"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendStripApi = exports.processPayment = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _catchAsyncErrors = _interopRequireDefault(require("./../middlewares/catchAsyncErrors"));

var _stripe = _interopRequireDefault(require("stripe"));

_dotenv["default"].config({
  path: 'backend/config/config.env'
});

var stripe = new _stripe["default"](process.env.STRIPE_SECRET_KEY);
/**
 * Process Stripe payments
 * @async route => /api/v1/payment/process
 * @function processPayment
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the payment data
 */

var processPayment = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var paymentIntent;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return stripe.paymentIntents.create({
              amount: req.body.amount,
              currency: 'usd',
              metadata: {
                integration_check: 'accept_a_payment'
              }
            });

          case 2:
            paymentIntent = _context.sent;
            res.status(200).json({
              success: true,
              client_secret: paymentIntent.client_secret
            });

          case 4:
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
 * Send Api Key to frontend
 * @async route => /api/v1/stripeapi
 * @function registerUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the payment data
 */

exports.processPayment = processPayment;
var sendStripApi = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res.status(200).json({
              stripeApiKey: process.env.STRIPE_API_KEY
            });

          case 1:
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
exports.sendStripApi = sendStripApi;