const mongodb = require("mongodb");

const { getDb } = require("../utils/database");
const ObjectId = mongodb.ObjectId;

module.exports = class Product {
  constructor(title, imageUrl, description, price, userId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.userId = userId;
  }

  async save() {
    const result = await getDb()
      .db("shop")
      .collection("products")
      .insertOne(this);
    return result;
  }
  static async findByIdAndDelete(id) {
    await getDb()
      .db()
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
    // TO BE CONFIRMED
    await getDb()
      .db()
      .collection("users")
      .updateOne(
        {},
        { $unset: { "cart.items.$[el]": "" } },
        { arrayFilters: [{ el: new ObjectId(id) }] }
      );
  }
  static async fetchAll(cb) {
    const result = await getDb().db().collection("products").find({}).toArray();
    cb(result);
  }

  static async findById(id, cb) {
    const result = await getDb()
      .db()
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    cb(result);
  }
  static async findByIdAndUpdate(id, update) {
    await getDb()
      .db()
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });
  }
};
