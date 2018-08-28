const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const i18n = require('i18n');
const cors = require('cors');
const configDB = require('./app/config/database.js');

const app = express();

mongoose.connect(configDB.url);
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + configDB.url);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
  //move on
    next();
  }
});
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cookieParser());

const routes = require('./app/routes.js'); // load our routes and pass in our app and fully configured passport
//Multilingual support
i18n.configure({
  locales:['en'],
  directory: __dirname + '/locales'
});

//Init i18n app
app.use(i18n.init);

routes(app); // pass app and  routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)

    res.json({
      message: err.message,
      error: err
    })
  })
}
// production error handler
// no stacktraces leaked to user

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
})


module.exports = app;
