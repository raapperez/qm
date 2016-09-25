'use strict';
const env = process.env.NODE_ENV || 'development';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('winston');
const lodashExpress = require('lodash-express');
const compression = require('compression');
const config = require('./configs/config.json')[env];

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
lodashExpress(app, 'html');
app.set('view engine', 'html');

if (env === 'production') {
  app.use(compression());
}

const winstonStream = {
  write: message => {
    logger.info(message.slice(0, -1));
  }
};

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('combined', { stream: winstonStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.authSecret
}, (payload, done) => {
  done(null, payload);
}));

app.use(passport.initialize());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});


const v1Routes = require('./routes/api/v1-routes');
app.use('/api/v1', v1Routes);

const qmRoutes = require('./routes/qm');
app.use('/', qmRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    logger.error(err);
    res.status(err.status || 500);

    const response = {
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack
    };

    if (req.headers.accept === 'application/json') {
      res.json(response);
      return;
    }

    res.render('error', response);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(err.status || 500);

  const response = {
    status: err.status,
    message: err.message,
    error: {}
  };

  if (req.headers.accept === 'application/json') {
    res.json(response);
    return;
  }

  res.render('error', response);
});


module.exports = app;
