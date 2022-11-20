const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bunyan = require('bunyan');
const cors = require('cors');
const authRouter = require('../routes/authRouter');
const userRouter = require('../routes/userRouter');
const config = require('../config');
const globalError = require('../middlewares/globalError');

const app = express();
const log = bunyan.createLogger({ name: 'app' });

//middleware-global
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

//routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

if (config.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', '..', 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running..');
  });
  app.get('*', (req, res) => {
    res.status(404).send('404 not found');
  });
}
app.use(globalError);

const port = config.PORT;
exports.server = app.listen(port, () => {
  log.info(`server is running on port ${port}...`);
});
