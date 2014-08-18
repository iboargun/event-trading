var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/event-trading-app');

var site = require('./routes/site');
var users = require('./routes/users');
var termine = require('./routes/termine');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/event-trading-app", {native_parser:true});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// General Routes
app.use('/', site);

// User
app.use('/users', users);

// Termine
app.use('/termine', termine);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('site/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('site/error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
