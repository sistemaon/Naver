
const mongoose = require('mongoose');

const dbIp = process.env.DB_IP;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const uri = `mongodb://${dbIp}:${dbPort}/${dbName}`;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  keepAlive: true,
  keepAliveInitialDelay: 270000,
  maxPoolSize: 10
};

const conn = mongoose.createConnection(uri, options);

module.exports = conn;
