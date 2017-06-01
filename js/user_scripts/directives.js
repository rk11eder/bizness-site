biznessApp.directive('menu', [ 'services','$rootScope','$timeout', function (services,$rootScope,$timeout) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
      
      scope.isActive = false;
      scope.activeButton = function() {
        scope.isActive = !scope.isActive;
      };
        scope.changeClass = function(){
            console.log("change class");

            if ($rootScope.menuMobileControler === 0 || $rootScope.menuMobileControler === 2){

                $rootScope.menuMobileControler = 1;
                // $rootScope.interface = '1';

            }else {
                $rootScope.menuMobileControler = 2;

                $timeout(function(){
                    if($rootScope.menuMobileControler===2){
                        $rootScope.menuMobileControler =0;
                    }

                    }, 1000);
                // $rootScope.interface = '2';
            }
            console.log($rootScope.menuMobileControler);

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
              /*$rootScope.hide_menu = 2;
              $rootScope.hide__botao_menu = 2;*/
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

biznessApp.directive('footer', [function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
     
    },
    templateUrl: 'templates/footer.html'
  };
}]);
biznessApp.directive('scrollOnClick', function() {
    return {
        restrict: 'A',
        link: function(scope, $elm) {
            $elm.on('click', function() {
                angular.element("body").animate({scrollTop: $elm.offset().top}, "slow");
            });
        }
    }
});

