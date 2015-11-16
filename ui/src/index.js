(function() {
    'use strict';
    var sca = angular.module('sca-shared', [
        'sca-shared.menu',
        //'toaster',
    ]);

    /* doesn't work
    //http://stackoverflow.com/questions/21103724/angular-directive-templateurl-relative-to-js-file
    //find the fullpath of "this" script.
    //idea here is that, the executing script file will always be the last on in the scripts array
    //(TODO - I need to test this on different browser)
    function dirname() {
        var scripts = document.getElementsByTagName("script")
        console.log("dirname:"+scripts[scripts.length-1].src);
        return scripts[scripts.length-1].src;
    }
    */

    //IE's json caching is a very common problem.. I am not sure if I should do this here or not,
    //but for now I am applying this to *all* sca shared users
    //http://stackoverflow.com/questions/16098430/angular-ie-caching-issue-for-http
    sca.config(['$httpProvider', function($httpProvider) {
        //initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};    
        }    
        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        // extra
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }]);

    sca.factory('scaMessage', function($cookies) {
        function getMessages() {
            var messages = []; 
            var messages_j = sessionStorage.getItem('sca_message');
            if(messages_j) messages = JSON.parse(messages_j);
            return messages;
        }

        function setMessages(messages) {
            sessionStorage.setItem('sca_message', JSON.stringify(messages));
        }

        function add(msg) {
            var messages = getMessages();
            //TODO - suppress duplicate messages?
            messages.push(msg);
            setMessages(messages);
        }

        //load messages passed via cookie
        var messages = $cookies.get("messages");
        if(messages) {
            JSON.parse(messages).forEach(function(message) {
                add(message);
            });
            $cookies.remove("messages", {path: "/"});
        }

        return {
            success: function(msg) {
                add({type: 'success', message: msg});
            },
            info: function(msg) {
                add({type: 'info', message: msg});
            },
            error: function(msg) {
                add({type: 'error', message: msg, showCloseButton: true, timeout: 0});
            },
            warning: function(msg) {
                add({type: 'warning', message: msg});
            },

            //dump all message to toaster
            show: function(toaster) {
                var messages = getMessages();
                messages.forEach(function(message) {
                    toaster.pop(message.type, message.message);
                }); 
                setMessages([]);
            }
        };
    });

    /*
    //redirecto to whevever user needs to go after auccessful login
    sca.factory('scaRedirector', function() {
        
        function geturls() {
            var urls_json = sessionStorage.getItem('sca_redirects');
            var urls = []; //by default, pop back to the document referrer
            if(urls_json) urls = JSON.parse(urls_json);
            return urls;
        }

        function seturls(urls) {
            sessionStorage.setItem('sca_redirects', JSON.stringify(urls));
        }

        return {
            push: function(url, clear) {
                if(clear) { 
                    var urls = [url];
                } else {
                    var urls = geturls();
                    urls.push(url);
                }
                //if(!url) url = document.referrer;
                seturls(urls);
            },

            //you have to do window.location = scaRedirector.pop(); yourself
            pop: function() {
                var urls = geturls();
                var url = urls.pop();
                //if(!url) return document.referrer; 
                seturls(urls);
                return url;
            }
        }
    });
    */

    sca.directive('scaMenulist', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {menu: '=', active: '='},
        templateUrl: dirname().replace('shared.js', 'menulist.html')
        /*
        link: function (scope, element) {
            scope.name = 'Jeff';
        }
        */
      };
    });

    //anyone uses this still?
    sca.directive('scaTab', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {menu: '=', active: '='},
        templateUrl: dirname().replace('shared.js', 'tab.html'),
        link: function(scope, element) {
        }
      };
    });

    sca.directive('scaMenutab', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {menu: '=', active: '=', user: '='},
            //templateUrl: dirname().replace('shared.js', 'menubar.html'),
            templateUrl: '../shared/menutab.html', //TODO - make this configurable!
            link: function (scope, element) {
                var user_scope = {common: []}; //empty for guest
                if(scope.user) user_scope = scope.user.scopes;  
                //call show if it's function and convert to true/false based on user scope provided
                scope.menu.forEach(function(m) {
                    if(typeof m.show == 'function') m.show = m.show(user_scope);
                });
                scope.go = function(url) {
                    document.location = url;
                };
            }
        };
    });

    sca.directive('scaMenubar', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {header: '=', menu: '=', user: '=', active: '=', profile: '='},
            //templateUrl: dirname().replace('shared.js', 'menubar.html'),
            templateUrl: '../shared/menubar.html', //TODO - make this configurable!
            link: function (scope, element, attrs) {
                //if(!scope.menu) return; //menu not loaded(yet?)
                var user_scope = {common: []}; //empty for guest
                if(scope.user) user_scope = scope.user.scopes;  
                scope.menu.forEach(function(m) {
                    if(typeof m.show == 'function') m.show = m.show(user_scope);
                });
                scope.isright = function(page) {
                    if(page.props && page.props.right && page.props.right === true) return true;
                    return false;
                };
                scope.renderLabel = function(props) {
                    if(props.profile && scope.profile && scope.profile[props.profile]) {
                        return scope.profile[props.profile];
                    }
                    return props.default;
                };
            }
        };
    });

})();
