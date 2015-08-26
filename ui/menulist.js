
app.directive('scaMenulist', function(appconf) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {menu: '=', active: '='},
    templateUrl: 'menulist.html',
    /*
    link: function (scope, element) {
        scope.name = 'Jeff';
    }
    */
  };
});


