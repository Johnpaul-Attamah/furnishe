"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProductReview = exports.getProductReview = exports.createProductReview = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAdminProducts = exports.getProducts = exports.newProduct = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _apiFeatures = _interopRequireDefault(require("./../utils/apiFeatures"));

var _catchAsyncErrors = _interopRequireDefault(require("../middlewares/catchAsyncErrors"));

var _errorHandler = _interopRequireDefault(require("../utils/errorHandler"));

/**
 * create new Product
 * @async route => /api/v1/product/new
 * @function newProduct
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */
var newProduct = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var images, imagesLinks, i, result, product;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            images = [];

            if (typeof req.body.images === 'string') {
              images.push(req.body.images);
            } else {
              images = req.body.images;
            }

            imagesLinks = [];
            i = 0;

          case 4:
            if (!(i < images.length)) {
              _context.next = 12;
              break;
            }

            _context.next = 7;
            return _cloudinary["default"].v2.uploader.upload(images[i], {
              folder: 'furnishe/products'
            });

          case 7:
            result = _context.sent;
            imagesLinks.push({
              publicId: result.public_id,
              url: result.secure_url
            });

          case 9:
            i++;
            _context.next = 4;
            break;

          case 12:
            req.body.images = imagesLinks;
            req.body.user = req.user.id;
            _context.next = 16;
            return _Product["default"].create(req.body);

          case 16:
            product = _context.sent;
            res.status(201).json({
              success: true,
              product: product
            });

          case 18:
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
 * Get all Products
 * Get menu
 * Public route
 * @async route => /api/v1/products
 * @function getProducts
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */

exports.newProduct = newProduct;
var getProducts = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var resPerPage, productsCount, apiFeatures, products, filteredProductsCount;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            resPerPage = 4;
            _context2.next = 3;
            return _Product["default"].countDocuments();

          case 3:
            productsCount = _context2.sent;
            apiFeatures = new _apiFeatures["default"](_Product["default"].find(), req.query).search().filter();
            _context2.next = 7;
            return apiFeatures.query;

          case 7:
            products = _context2.sent;
            filteredProductsCount = products.length;
            apiFeatures.pagination(resPerPage);
            _context2.next = 12;
            return apiFeatures.query;

          case 12:
            products = _context2.sent;
            res.status(200).json({
              success: true,
              productsCount: productsCount,
              resPerPage: resPerPage,
              filteredProductsCount: filteredProductsCount,
              products: products
            });

          case 14:
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
 * Get all Products admin route
 * Get menu
 * Private route
 * @async route => /api/v1/admin/products
 * @function getAdminProducts
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */

exports.getProducts = getProducts;
var getAdminProducts = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var products;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Product["default"].find();

          case 2:
            products = _context3.sent;
            res.status(200).json({
              success: true,
              products: products
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
 * Get product by id
 * Public route
 * @async route => /api/v1/products/:id
 * @function getSingleProduct
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */

exports.getAdminProducts = getAdminProducts;
var getSingleProduct = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var product;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Product["default"].findById(req.params.id);

          case 2:
            product = _context4.sent;

            if (product) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", next(new _errorHandler["default"]("product with id ".concat(req.params.id, " not found"))));

          case 5:
            res.status(200).json({
              success: true,
              product: product
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
 * update product details
 * Admin route
 * @async route => /api/v1/product/:id
 * @function updateProduct
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */

exports.getSingleProduct = getSingleProduct;
var updateProduct = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var product, images, i, result, imagesLinks, _i, _result;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Product["default"].findById(req.params.id);

          case 2:
            product = _context5.sent;

            if (product) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", next(new _errorHandler["default"]('product not found', 404)));

          case 5:
            images = [];

            if (typeof req.body.images === 'string') {
              images.push(req.body.images);
            } else {
              images = req.body.images;
            }

            if (!(images !== undefined)) {
              _context5.next = 27;
              break;
            }

            i = 0;

          case 9:
            if (!(i < product.images.length)) {
              _context5.next = 16;
              break;
            }

            _context5.next = 12;
            return _cloudinary["default"].v2.uploader.destroy(product.images[i].publicId);

          case 12:
            result = _context5.sent;

          case 13:
            i++;
            _context5.next = 9;
            break;

          case 16:
            imagesLinks = [];
            _i = 0;

          case 18:
            if (!(_i < images.length)) {
              _context5.next = 26;
              break;
            }

            _context5.next = 21;
            return _cloudinary["default"].v2.uploader.upload(images[_i], {
              folder: 'furnishe/products'
            });

          case 21:
            _result = _context5.sent;
            imagesLinks.push({
              publicId: _result.public_id,
              url: _result.secure_url
            });

          case 23:
            _i++;
            _context5.next = 18;
            break;

          case 26:
            req.body.images = imagesLinks;

          case 27:
            _context5.next = 29;
            return _Product["default"].findByIdAndUpdate(req.params.id, req.body, {
              "new": true,
              runValidators: "true",
              useFindAndModify: false
            });

          case 29:
            product = _context5.sent;
            res.status(200).json({
              success: true,
              product: product
            });

          case 31:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
/**
 * Delete product
 * Admin route
 * @async route => /api/v1/product/:id
 * @function deleteProduct
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the message
 */

exports.updateProduct = updateProduct;
var deleteProduct = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var product, i, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Product["default"].findById(req.params.id);

          case 2:
            product = _context6.sent;

            if (product) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", next(new _errorHandler["default"]("Product with id ".concat(req.params.id, " not found"))));

          case 5:
            i = 0;

          case 6:
            if (!(i < product.images.length)) {
              _context6.next = 13;
              break;
            }

            _context6.next = 9;
            return _cloudinary["default"].v2.uploader.destroy(product.images[i].publicId);

          case 9:
            result = _context6.sent;

          case 10:
            i++;
            _context6.next = 6;
            break;

          case 13:
            _context6.next = 15;
            return product.remove();

          case 15:
            res.status(200).json({
              success: true,
              message: 'Product deleted'
            });

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
/**
 * create new product Review
 * @async route => /api/v1/review
 * @function createProductReview
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */

exports.deleteProduct = deleteProduct;
var createProductReview = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
    var _req$body, rating, comment, productId, userReview, product, isReviewed;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body = req.body, rating = _req$body.rating, comment = _req$body.comment, productId = _req$body.productId;
            userReview = {
              user: req.user._id,
              name: req.user.name,
              rating: rating,
              comment: comment
            };
            _context7.next = 4;
            return _Product["default"].findById(productId);

          case 4:
            product = _context7.sent;
            isReviewed = product.reviews.find(function (r) {
              return r.user.toString() === req.user._id.toString();
            });

            if (isReviewed) {
              product.reviews.forEach(function (review) {
                if (review.user.toString() === req.user._id.toString()) {
                  review.comment = userReview.comment;
                  review.rating = userReview.rating;
                }
              });
            } else {
              product.reviews.push(userReview);
              product.numOfReviews = product.reviews.length;
            }

            product.ratings = product.reviews.reduce(function (acc, item) {
              return item.rating + acc;
            }, 0) / product.reviews.length;
            _context7.next = 10;
            return product.save({
              validateBeforeSave: false
            });

          case 10:
            res.status(200).json({
              success: true
            });

          case 11:
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
/**
 * get all reviews of a product
 * @async route => /api/v1/review
 * @function getProductReview
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */

exports.createProductReview = createProductReview;
var getProductReview = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var product;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _Product["default"].findById(req.query.id);

          case 2:
            product = _context8.sent;
            res.status(200).json({
              success: true,
              reviews: product.reviews
            });

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x22, _x23, _x24) {
    return _ref8.apply(this, arguments);
  };
}());
/**
 * delete a product review
 * @async route => /api/v1/review
 * @function deleteProductReview
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */

exports.getProductReview = getProductReview;
var deleteProductReview = (0, _catchAsyncErrors["default"])( /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var product, reviews, ratings, numOfReviews;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _Product["default"].findById(req.query.productId);

          case 2:
            product = _context9.sent;
            reviews = product.reviews.filter(function (review) {
              return review._id.toString() !== req.query.id.toString();
            });
            ratings = product.reviews.reduce(function (acc, item) {
              return item.rating + acc;
            }, 0) / reviews.length;
            numOfReviews = reviews.length;
            _context9.next = 8;
            return _Product["default"].findByIdAndUpdate(req.query.productId, {
              reviews: reviews,
              ratings: ratings,
              numOfReviews: numOfReviews
            }, {
              "new": true,
              runValidators: true,
              useFindAndModify: false
            });

          case 8:
            res.status(200).json({
              success: true
            });

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x25, _x26, _x27) {
    return _ref9.apply(this, arguments);
  };
}());
exports.deleteProductReview = deleteProductReview;