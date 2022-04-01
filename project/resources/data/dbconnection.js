const mongoClient = require("mongodb").MongoClient;

let _connection = null;

const open = function () {
  if (get() == null) {
    mongoClient.connect(process.env.DB_URL, function (err, client) {
      if (err) {
        console.log(process.env.DB_CONNECTION_ERROR_MESSAGE);
        return;
      }

      _connection = client.db(process.env.DB_NAME);
      console.log(process.env.DB_CONNECTION_SUCCESS_MESSAGE);
    });
  }
};

const get = function () {
  return _connection;
};

module.exports = {
  open,
  get,
};
