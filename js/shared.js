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
                    toaster.pop(message.type, message.message);//, tapToDismiss: true);
                }); 
                setMessages([]);
            }
        };
    });

    function init_menu(scope, menu) {
        if(!menu) {
            console.log("init_menu called with missing menu");
            return;
        }
        var user_scope = {}; //empty for guest
        if(scope.user) user_scope = scope.user.scopes;  
        menu.forEach(function(m) {
            if(typeof m.show == 'function') {
                try {
                    m._show = m.show(user_scope);
                    //console.log(m.show);
                } catch(e) {
                    m._show = false;
                }
            }
            if(m.submenu) init_menu(scope, m.submenu);
        });
    }

    sca.directive('scaMenutab', function(scaSharedConfig) {
        return {
            restrict: 'E',
            //transclude: true,
            scope: {menu: '=', active: '=', user: '=', fluid: '='},
            templateUrl: (scaSharedConfig.shared_url||"../shared")+'/t/menutab.html', 
            link: function (scope, element) {
                scope.$watch('user', function() {
                    init_menu(scope, scope.menu);
                });
                scope.go = function(url) {
                    document.location = url;
                };
            }
        };
    });

    sca.directive('scaMenubar', function(scaSharedConfig) {
        return {
            restrict: 'E',
            //transclude: true,
            scope: {header: '=', menu: '=', user: '=', active: '=', fluid: '='},
            templateUrl: (scaSharedConfig.shared_url||"../shared")+'/t/menubar.html', 
            link: function (scope, element, attrs) {
                scope.$watch('user', function() {
                    init_menu(scope, scope.menu);
                });
                scope.isright = function(page) {
                    if(page.props && page.props.right && page.props.right === true) return true;
                    return false;
                };
                scope.renderLabel = function(props) {
                    if(props.profile && scope.user.profile && scope.user.profile[props.profile]) {
                        return scope.user.profile[props.profile];
                    }
                    return props.default;
                };
            }
        };
    });

    //tried to use component but coudn't get it to work
    sca.directive('scaBreadcrumb', function(scaSharedConfig) {
        return {
            restrict: 'E',
            templateUrl: (scaSharedConfig.shared_url||"../shared")+'/t/breadcrumb.html', 
            scope: {
                //instid: '=',
                breads: '=',
                active: '=',
            },
            link: function($scope, elm, attrs, ctrl) {
                $scope.click = function(bread) {
                    //document.location = bread.url.replace(":instid", $scope.instid);
                    document.location = bread.url;
                }
            },
        }
    });

    /*
    sca.component('scaSidemenu', {
        transclude: true,
        controller: function() {
        },
        templateUrl: (scaSharedConfig.shared_url||"../shared")+'/t/sidemenu.html', 
    });
    */

})();
