const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = async callback => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_CLIENT, {
      useUnifiedTopology: true
    });
    _db = client;
    callback(null, client);
  } catch (error) {
    callback(error);
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error("No database initialised");
  }
  return _db;
};

module.exports = { MongoConnect, getDb };
