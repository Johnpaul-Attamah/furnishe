"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOrder = exports.updateOrder = exports.allOrders = exports.myOrders = exports.getSingleOrder = exports.newOrder = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Order = _interopRequireDefault(require("../models/Order"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _errorHandler = _interopRequireDefault(require("./../utils/errorHandler"));

var _catchAsyncErrors = _interopRequireDefault(require("../middlewares/catchAsyncErrors"));

/**
 * create new order
 * @async route => /api/v1/order/new
 * @function newOrder
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */
var newOrder = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo, order;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, orderItems = _req$body.orderItems, shippingInfo = _req$body.shippingInfo, itemsPrice = _req$body.itemsPrice, taxPrice = _req$body.taxPrice, shippingPrice = _req$body.shippingPrice, totalPrice = _req$body.totalPrice, paymentInfo = _req$body.paymentInfo;
            _context.next = 3;
            return _Order["default"].create({
              orderItems: orderItems,
              shippingInfo: shippingInfo,
              itemsPrice: itemsPrice,
              taxPrice: taxPrice,
              shippingPrice: shippingPrice,
              totalPrice: totalPrice,
              paymentInfo: paymentInfo,
              paidAt: Date.now(),
              user: req.user._id
            });

          case 3:
            order = _context.sent;
            res.status(200).json({
              success: true,
              order: order
            });

          case 5:
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
 * Get order by id
 * Admin route
 * @async route => /api/v1/orders/:id
 * @function getSingleOrder
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */

exports.newOrder = newOrder;
var getSingleOrder = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var order;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Order["default"].findById(req.params.id).populate('user', 'name email');

          case 2:
            order = _context2.sent;

            if (order) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", next(new _errorHandler["default"]("order with id ".concat(req.params.id, " not found"), 404)));

          case 5:
            res.status(200).json({
              success: true,
              order: order
            });

          case 6:
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
/**
 * Get logged in user orders
 * protected route
 * @async route => /api/v1/orders/me
 * @function myOrders
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */

exports.getSingleOrder = getSingleOrder;
var myOrders = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var orders;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Order["default"].find({
              user: req.user.id
            });

          case 2:
            orders = _context3.sent;
            res.status(200).json({
              success: true,
              orders: orders
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
/**
 * Get all orders
 * admin route
 * @async route => /api/v1/admin/orders
 * @function myOrders
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */

exports.myOrders = myOrders;
var allOrders = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var orders, totalAmount;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Order["default"].find();

          case 2:
            orders = _context4.sent;
            totalAmount = 0;
            orders.forEach(function (order) {
              return totalAmount += order.totalPrice;
            });
            res.status(200).json({
              success: true,
              totalAmount: totalAmount,
              orders: orders
            });

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
/**
 * update orders
 * Admin route
 * @async route => /api/v1/orders/:id
 * @function myOrders
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */

exports.allOrders = allOrders;
var updateOrder = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var order;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Order["default"].findById(req.params.id);

          case 2:
            order = _context6.sent;

            if (!(order.orderStatus === 'Delivered')) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", next(new _errorHandler["default"]('You have already delivered this order', 400)));

          case 5:
            order.orderItems.forEach( /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(item) {
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return updateStock(item.product, item.quantity);

                      case 2:
                        return _context5.abrupt("return", _context5.sent);

                      case 3:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x16) {
                return _ref6.apply(this, arguments);
              };
            }());
            order.orderStatus = req.body.status, order.deliveredAt = Date.now();
            _context6.next = 9;
            return order.save();

          case 9:
            res.status(200).json({
              success: true
            });

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
exports.updateOrder = updateOrder;

function updateStock(_x17, _x18) {
  return _updateStock.apply(this, arguments);
}
/**
 * delete orders
 * Admin route
 * @async route => /api/v1/orders/:id
 * @function deleteOrders
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} delete message
 */


function _updateStock() {
  _updateStock = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id, quantity) {
    var product;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _Product["default"].findById(id);

          case 2:
            product = _context8.sent;
            product.stock = product.stock - quantity;
            _context8.next = 6;
            return product.save();

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _updateStock.apply(this, arguments);
}

var deleteOrder = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var order;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _Order["default"].findById(req.params.id);

          case 2:
            order = _context7.sent;

            if (order) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt("return", next(new _errorHandler["default"]("No data found with id ".concat(req.params.id))));

          case 5:
            _context7.next = 7;
            return order.remove();

          case 7:
            res.status(200).json({
              success: true
            });

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}());
exports.deleteOrder = deleteOrder;