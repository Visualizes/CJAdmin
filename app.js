const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const appRoutes = require('./routes/app');
const fs = require('fs');

const app = express();

// view engine setup
if (fs.existsSync('./dist')) {
  app.set('views', path.join(__dirname, 'dist'));
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
if (fs.existsSync('./dist')) {
  app.use(express.static(path.join(__dirname, 'dist/CJAdmin/')));
}

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS, PUT');
  next();
});

app.use('/', appRoutes);

// catch 404 and forward to error handler

if (fs.existsSync('./dist')) {
  app.use(function (req, res, next) {
    return res.render('index.html');
  });
}
module.exports = app;
