
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
    templateUrl: dirname().replace('menulist.js', 'menulist.html')
    /*
    link: function (scope, element) {
        scope.name = 'Jeff';
    }
    */
  };
});


