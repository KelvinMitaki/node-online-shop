const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true }
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
