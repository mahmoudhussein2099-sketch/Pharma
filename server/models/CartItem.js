// server/models/CartItem.js

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: [1, 'Quantity must be at least 1'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CartItem', cartItemSchema);
