const mongoose = require("mongoose");

const Order = require("./order");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

UserSchema.methods.addToCart = function (product) {
  const updatedCartItems = [...this.cart.items];
  let newQuantity = 1;
  const cartProductIndex = this.cart.items.findIndex(
    pro => pro.productId.toString() === product._id.toString()
  );

  if (cartProductIndex !== -1) {
    newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }

  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  this.save();
};

UserSchema.methods.deleteFromCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex(
    prod => prod.productId.toString() === product._id.toString()
  );
  const cartItems = [...this.cart.items];
  const cartQuantity = cartItems[cartProductIndex].quantity;
  if (cartQuantity === 1) {
    const newCartItems = cartItems.filter(
      item => item.productId.toString() !== product._id.toString()
    );
    this.cart.items = newCartItems;
    this.save();
  } else {
    const newQuantity = cartQuantity - 1;
    cartItems[cartProductIndex].quantity = newQuantity;
    this.cart.items = cartItems;
    this.save();
  }
};

UserSchema.methods.addOrder = async function () {
  const order = {
    items: this.cart.items,
    user: { _id: this._id, name: this.name }
  };
  const test = new Order(order);
  await test.save();

  this.cart = { items: [] };
  this.save();
};
UserSchema.methods.getUserOrders = function () {};

const User = mongoose.model("User", UserSchema);
module.exports = User;
