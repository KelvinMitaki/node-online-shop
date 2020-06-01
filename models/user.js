const mongodb = require("mongodb");

const { getDb } = require("../utils/database");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  async save() {
    await getDb().db().collection("users").insertOne(this);
  }
  async addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(
      pro => pro.productId.toString() === product._id.toString()
    );
    const updatedCartItems = [...this.cart.items];
    let newQuantity = 1;
    if (cartProductIndex !== -1) {
      newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity
      });
    }

    const updatedCart = {
      items: updatedCartItems
    };
    await getDb()
      .db()
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  static async findById(id) {
    return await getDb()
      .db()
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) });
  }
}
module.exports = User;
