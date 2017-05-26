
'use strict';

/* App Module */

var biznessApp = angular.module('biznessApp', [
  'ngRoute',
  'ngSanitize',
  'services',
  'uiGmapgoogle-maps',
  'ngAnimate'
]);

/*EXEMPLO ROUTING*/
biznessApp.config(['$routeProvider','$locationProvider','$animateProvider',
  function($routeProvider,$locationProvider,$animateProvider) {
    $routeProvider.
      when('/'+lang+'/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl',
        resolve:{
          items: ['$rootScope','services', function($rootScope,services){
            $rootScope.area_sel = 'home';
            $rootScope.sub_area_sel = '';
            $rootScope.menu_mobile_open = false;
            $rootScope.array_tags = [];
            var promise2 = services.get_destaques();
            $rootScope.destaques = promise2.response;
             var promise = services.insta();
            return promise;

          }]
        }
      }).
    when('/'+lang+'/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'portfolioCtrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'portfolio';
                $rootScope.sub_area_sel = '';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                var item = services.getSize();
                return item;
            }]
        }
    }).
    when('/'+lang+'/portfolio2', {
        templateUrl: 'views/portfolio2.html',
        controller: 'portfolio2Ctrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'portfolio';
                $rootScope.sub_area_sel = 'portfolio2';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                
                return 1;
            }]
        }
    }).
    when('/'+lang+'/contactos', {
        templateUrl: 'views/contactos.html',
        controller: 'contactosCtrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'contactos';
                $rootScope.sub_area_sel = '';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                var promise = services.insta();
                return promise;
            }]
        }
    }).
    when('/'+lang+'/sobrenos', {
        templateUrl: 'views/sobrenos.html',
        controller: 'sobrenosCtrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'sobrenos';
                $rootScope.sub_area_sel = '';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                var promise = services.insta();
                return promise;
            }]
        }
    }).
      // when('/'+lang+'/projects/:id', {
      //   templateUrl: 'views/project.html',
      //   controller: 'projectCtrl',
      //   resolve:{
      //     items: ['$rootScope','services','$route', function($rootScope,services,$route){
           
      //       $rootScope.area_sel = 'project';
      //       $rootScope.menu_mobile_open = false;
      //       $rootScope.array_tags = [];
      //       // var promise = services.get_posts($rootScope.array_tags,0,8,lang); 
      //       console.log($route.current.params.id,lang+"ois"); 
      //       return services.get_projeto_aberto($route.current.params.id,lang);
      //     }]
      //   }
      // }).
      otherwise({
        redirectTo: '/'+lang+'/home'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });
      $animateProvider.classNameFilter((/ng-hide/));

  }]);


/*exemplo codigo global*/
biznessApp.run(['$rootScope','services',function($rootScope, services){
  
  /*GET LANG*/
  $rootScope.lang = lang;
  $rootScope.lang_array = array_lang;
  $rootScope.menuMobileControler=0;
  $rootScope.interface = '0';

  $rootScope.pathgeral = pathgeral;
  
}]);
