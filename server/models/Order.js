// server/models/Order.js

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
});

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [arr => arr.length > 0, 'Order must have at least one item'],
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    total: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total must be non-negative'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
