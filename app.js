
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const envs = require('./env');
// Set environment variables
for (const env in envs) {
  process.env[env] = envs[env];
};

// define routers
const userRouter = require('./modules/User/route/user');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// use routers defined
app.use('/api/v1', userRouter);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  return next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  // send the error
  res.status(err.status || 500);
  return res.send(err || 'error');
});

module.exports = app;
