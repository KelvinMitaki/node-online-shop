const mongodb = require("mongodb");

const { getDb } = require("../utils/database");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }
  async save() {
    await getDb().db().collection("users").insertOne(this);
  }
  static async findById(id) {
    return await getDb()
      .db()
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) });
  }
}
module.exports = User;
