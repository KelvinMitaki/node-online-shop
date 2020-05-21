const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoConnect = async callback => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://kevinmitaki:kevinmitaki@cluster0-sdlak.mongodb.net/test?retryWrites=true&w=majority"
    );
    console.log("connected");
    callback(client);
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongoConnect;
