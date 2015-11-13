
//node
var fs = require('fs');
var spawn = require('child_process').spawn;

//contrib
var winston = require('winston');
var amqp = require('amqp');
//var redis = require('redis');
var async = require('async');
var _ = require('underscore');
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

//mine
var config = require('./config');
var logger = new winston.Logger(config.logger.winston);

/*
//polyfill?
function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed");
}
*/
router.get('/health', function(req, res) { res.json({status: 'running'}); });

/*
router.get('/menu/:path', jwt({secret: config.express.jwt.secret, credentialsRequired: false}), function(req, res, next) {
    var paths = req.params.path.split(".");
    
    //guest scope
    var scopes = {
        common: [],
    };

    //pick the menu path specified
    var nodes = config.menus;
    while(paths.length > 0) {
        logger.debug(paths.length);
        var p = paths.shift();
        var found = null;
        //logger.debug("searching "+p);
        //console.log(JSON.stringify(nodes, null, 4));
        for(var i = 0;i < nodes.length; ++i) {
            if(nodes[i].id == p)  {
                found = nodes[i].submenu;    
                break;
            }
        }
        if(found) nodes = found;
        else return next(new Error("couldn't find menu with specified path:"+ req.params.path));
    }

    if(req.user) scopes = req.user.scopes;
    res.json(get_menu(nodes, scopes));
});

//get menu items that meets user's scope
function get_menu(themenus, scopes) {
    var menus = [];
    //search for menu
    themenus.forEach(function(menu) {
        if(menu.scope && scopes && !menu.scope(scopes)) return;
        var _menu = _.clone(menu);
        if(_menu.submenu) {
            _menu.submenu = get_menu(_menu.submenu, scopes);
        }
        menus.push(_menu);
    });
    return menus;
}
*/
module.exports = router;
