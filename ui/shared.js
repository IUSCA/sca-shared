(function() {
    'use strict';
    var sca = angular.module('sca-shared', []);

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

    sca.directive('scaTab', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {menu: '=', active: '='},
        templateUrl: dirname().replace('shared.js', 'tab.html')
      };
    });

    sca.directive('scaMenutab', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {menu: '=', active: '='},
            //templateUrl: dirname().replace('shared.js', 'menubar.html'),
            templateUrl: '../shared/menutab.html', //TODO - make this configurable!
            link: function (scope, element) {
                scope.go = function(url) {
                    document.location = url;
                }
            }
        };
    });

    sca.directive('scaMenubar', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {menu: '=', active: '=', profile: '='},
            //templateUrl: dirname().replace('shared.js', 'menubar.html'),
            templateUrl: '../shared/menubar.html', //TODO - make this configurable!
            link: function (scope, element, attrs) {
                scope.isright = function(page) {
                    if(page.props && page.props.right && page.props.right === true) return true;
                    return false;
                }
                scope.renderLabel = function(props) {
                    if(props.profile && scope.profile && scope.profile[props.profile]) {
                        return scope.profile[props.profile];
                    }
                    return props.default;
                }
            }
        };
    });

})();
