"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var APIFeatures = /*#__PURE__*/function () {
  function APIFeatures(query, queryString) {
    (0, _classCallCheck2["default"])(this, APIFeatures);
    this.query = query;
    this.queryString = queryString;
  }

  (0, _createClass2["default"])(APIFeatures, [{
    key: "search",
    value: function search() {
      var keyword = this.queryString.keyword ? {
        name: {
          $regex: this.queryString.keyword,
          $options: 'i'
        }
      } : {};
      this.query = this.query.find(_objectSpread({}, keyword));
      return this;
    }
  }, {
    key: "filter",
    value: function filter() {
      var queryCopy = _objectSpread({}, this.queryString); //Remove fields from query


      var removedFields = ['keyword', 'limit', 'page'];
      removedFields.forEach(function (f) {
        return delete queryCopy[f];
      }); //Advanced filters

      var queryString = JSON.stringify(queryCopy);
      queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, function (match) {
        return "$".concat(match);
      });
      this.query = this.query.find(JSON.parse(queryString));
      return this;
    }
  }, {
    key: "pagination",
    value: function pagination(resPerPage) {
      var currentPage = Number(this.queryString.page) || 1;
      var skipped = resPerPage * (currentPage - 1);
      this.query = this.query.limit(resPerPage).skip(skipped);
      return this;
    }
  }]);
  return APIFeatures;
}();

var _default = APIFeatures;
exports["default"] = _default;