const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

exports.NODE_ENV = process.env.NODE_ENV || 'production';
exports.PORT = process.env.PORT || 5000;
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '90d';

exports.CLOUD_NAME = process.env.CLOUD_NAME;
exports.CLOUD_API_KEY = process.env.CLOUD_API_KEY;
exports.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
