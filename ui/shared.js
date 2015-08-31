
//http://stackoverflow.com/questions/21103724/angular-directive-templateurl-relative-to-js-file
//find the fullpath of "this" script.
//idea here is that, the executing script file will always be the last on in the scripts array
//(TODO - I need to test this on different browser)
function dirname() {
    var scripts = document.getElementsByTagName("script")
    return scripts[scripts.length-1].src;
}

app.directive('scaMenulist', function(appconf) {
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

app.directive('scaTab', function(appconf) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {menu: '=', active: '='},
    templateUrl: dirname().replace('shared.js', 'tab.html')
  };
});

app.directive('scaMenubar', function(appconf) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {menu: '=', active: '='},
        templateUrl: dirname().replace('shared.js', 'menubar.html'),
        link: function (scope, element) {
            scope.go = function(url) {
                document.location = url;
            }
        }
    };
});


