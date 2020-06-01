const mongodb = require("mongodb");

const { getDb } = require("../utils/database");
const ObjectId = mongodb.ObjectId;

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
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
};
