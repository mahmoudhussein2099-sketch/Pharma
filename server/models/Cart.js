// server/models/Cart.js

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: String, // replace later with: mongoose.Schema.Types.ObjectId if needed
      required: [true, 'User identifier is required'],
    },
    items: {
      type: [cartItemSchema],
      validate: [arr => arr.length > 0, 'Cart must have at least one item'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart', cartSchema);
