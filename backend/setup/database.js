const mongoose = require('mongoose');
const bunyan = require('bunyan');
const config = require('../config');

const connectDB = () => {
  const log = bunyan.createLogger({ name: 'database' });
  mongoose
    .connect(config.DATABASE_URL)
    .then(() => log.info('DB connection successful! 😎'))
    .catch(err => {
      if (config.NODE_ENV !== 'development') {
        log.error('DB connection failed! 😭');
      } else {
        log.error(err);
      }
      process.exit();
    });
  mongoose.set('strictQuery', false);
};

module.exports = connectDB;
