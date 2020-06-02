const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }
//   async save() {
//     await getDb().db().collection("users").insertOne(this);
//   }
//   async addToCart(product) {
//     if (!this.cart) {
//       this.cart = {};
//       this.cart.items = [];
//       this.cart.items.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: 1
//       });
//       await getDb()
//         .db()
//         .collection("users")
//         .updateOne(
//           { _id: new mongodb.ObjectId(this._id) },
//           { $set: { cart: this.cart } }
//         );
//       return;
//     }
//     const updatedCartItems = [...this.cart.items];
//     let newQuantity = 1;
//     const cartProductIndex = this.cart.items.findIndex(
//       pro => pro.productId.toString() === product._id.toString()
//     );

//     if (cartProductIndex !== -1) {
//       newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems
//     };
//     await getDb()
//       .db()
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }
//   async deleteFromCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(
//       prod => prod.productId.toString() === product._id.toString()
//     );

//     const cartItems = [...this.cart.items];
//     const cartQuantity = cartItems[cartProductIndex].quantity;
//     if (cartQuantity === 1) {
//       const newCartItems = cartItems.filter(
//         item => item.productId.toString() !== product._id.toString()
//       );
//       await getDb()
//         .db()
//         .collection("users")
//         .updateOne(
//           { _id: new mongodb.ObjectId(this._id) },
//           { $set: { "cart.items": newCartItems } }
//         );
//     } else {
//       const newQuantity = cartQuantity - 1;
//       cartItems[cartProductIndex].quantity = newQuantity;
//       await getDb()
//         .db()
//         .collection("users")
//         .updateOne(
//           { _id: new mongodb.ObjectId(this._id) },
//           { $set: { "cart.items": cartItems } }
//         );
//     }
//   }
//   async getProductCart() {
//     const productIds = this.cart.items.map(item => item.productId);
//     const products = await getDb()
//       .db()
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray();
//     return products.map(product => {
//       const productQuantity = this.cart.items.find(
//         item => item.productId.toString() === product._id.toString()
//       ).quantity;
//       return {
//         ...product,
//         quantity: productQuantity
//       };
//     });
//   }
//   async addOrder() {
//     const productsInCart = await this.getProductCart();
//     const order = {
//       items: productsInCart,
//       user: { _id: new mongodb.ObjectId(this._id), name: this.username }
//     };
//     await getDb().db().collection("orders").insertOne(order);
//     this.cart = { items: [] };
//     await getDb()
//       .db()
//       .collection("users")
//       .updateOne(
//         { _id: new mongodb.ObjectId(this._id) },
//         { $set: { "cart.items": [] } }
//       );
//   }
//   async getUserOrders() {
//     return await getDb()
//       .db()
//       .collection("orders")
//       .find({ "user._id": this._id })
//       .toArray();
//   }
//   static async findById(id) {
//     return await getDb()
//       .db()
//       .collection("users")
//       .findOne({ _id: new mongodb.ObjectId(id) });
//   }
// }
// module.exports = User;
