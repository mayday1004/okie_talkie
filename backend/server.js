const app = require('./setup/app');
const connectDB = require('./setup/database');
const connectSocket = require('./setup/socketio');

connectDB();
connectSocket(app.server);
