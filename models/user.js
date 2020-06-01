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
    // const cartProductIndex=this.cart.items.findIndex(pro=>pro._id===product._id)
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
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
