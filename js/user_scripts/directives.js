arquitetaApp.directive('menu', [ 'services', function (services) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
      
      scope.isActive = false;
      scope.activeButton = function() {
        scope.isActive = !scope.isActive;
      };

      scope.changelangPT =  function(){
          window.location.assign(pathgeral+'pt/'+scope.area_sel)
          console.log();   
      };
     scope.changelangEN =  function(){
          window.location.assign(pathgeral+'en/'+scope.area_sel)
          console.log();   
      };
      scope.changelangGE =  function(){
          window.location.assign(pathgeral+'ge/'+scope.area_sel)
          console.log();   
      };
    

    },
    templateUrl: 'templates/menu.html'
  };
}]);

arquitetaApp.directive('footer', [function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
     
    },
    templateUrl: 'templates/footer.html'
  };
}]);

