arquitetaApp.directive('menu', [ 'services','$rootScope', function (services,$rootScope) {
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
      scope.changeMenu = function () {
          // console.log($rootScope.hide_menu);
          if ($rootScope.hide_menu === 1){
              $rootScope.hide_menu = 2;
              $rootScope.hide__botao_menu = 2;
          }
          else {
              $rootScope.hide_menu = 1;
              $rootScope.hide_botao_menu= 1;
          }
          console.log($rootScope.hide_menu);
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

