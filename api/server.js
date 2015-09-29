'use strict';

//node
var fs = require('fs');

//contrib
var express = require('express');
var bodyParser = require('body-parser');
var winston = require('winston');
var expressWinston = require('express-winston');
var jwt = require('express-jwt');

//mine
var config = require('./config/config');
var controllers = require('./controllers');

//init express app
var app = express();
app.use(bodyParser.json()); 
app.use(expressWinston.logger(config.logger.winston));

//if(config.express.jwt) app.use(require('express-jwt')(config.express.jwt));

//setup routes
app.get('/health', function(req, res) { res.json({status: 'running'}); });
app.get('/menu', jwt({secret: config.express.jwt.secret, credentialsRequired: false}), controllers.menu);

//error handling
app.use(expressWinston.errorLogger(config.logger.winston)); 
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message, /*stack: err.stack*/}); //let's hide callstack for now
});

exports.app = app;
exports.start = function(cb) {
    var port = process.env.PORT || config.express.port || '8080';
    app.listen(port, function(err) {
        console.log("settings server listening on port %d in %s mode", port, app.settings.env);
        cb(err);
    });
};


