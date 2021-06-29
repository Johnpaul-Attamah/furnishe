"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var OrderSchema = new Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    phoneNo: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    }
  }],
  paymentInfo: {
    id: {
      type: String
    },
    status: {
      type: String
    }
  },
  itemsPrice: {
    type: Number,
    required: true,
    "default": 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    "default": 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    "default": 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    "default": 0.0
  },
  paidAt: {
    type: Date
  },
  orderStatus: {
    type: String,
    required: true,
    "default": 'processing'
  },
  deliveredAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var _default = _mongoose["default"].model('Order', OrderSchema);

exports["default"] = _default;