
//node
var fs = require('fs');
var spawn = require('child_process').spawn;

//contrib
var winston = require('winston');
var amqp = require('amqp');
//var redis = require('redis');
var async = require('async');
var _ = require('underscore');

//mine
var config = require('./config/config');
var logger = new winston.Logger(config.logger.winston);

/*
//polyfill?
function assert(condition, message) {
    if (!condition) throw new Error(message || "Assertion failed");
}
*/

exports.menu = function(req, res) {
    //var menuid = req.params.id;
    
    //guest scope
    var scopes = {
        common: [],
    };

    if(req.user) scopes = req.user.scopes;
    res.json(get_menu(config.menus, scopes));
}

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
    /*
    var key = req.query.key;
    var depth = req.query.depth || 1;

    get_state(key, depth, function(err, state) {
        res.json(state);
    });
    */
}

