const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const MongoConnect = async callback => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_CLIENT, {
      useUnifiedTopology: true
    });
    callback(null, client);
  } catch (error) {
    callback(error);
  }
};
module.exports = { MongoConnect };
