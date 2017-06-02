'use strict';

/*exemplo controller*/
biznessApp.controller('portfolioCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function portfolioCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });

		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('Bizness');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);


    $rootScope.users = items.projetos;
    console.log($rootScope.users);

    $scope.lado = 0;
    $scope.ladoBig = 0;

    $scope.iframeHeight = $(window).width();

    for (var i = 0; i < $scope.users.length; i++) {

        if ($scope.lado == 0) {
            $rootScope.users[i].lado = 0;
            $scope.lado = "1";

        } else {
            $rootScope.users[i].lado = 1;
            $scope.lado = 0;

        }
    }

    for (var i = 0; i < $scope.users.length; i++) {

        if ($scope.ladoBig == 0) {
            $rootScope.users[i].ladoBig = 0;
            $scope.ladoBig = "1";

        } else if ($scope.ladoBig == 1) {
            $rootScope.users[i].ladoBig = 1;
            $scope.ladoBig = 2;

        } else if ($scope.ladoBig == 2) {
            $rootScope.users[i].ladoBig = 2;
            $scope.ladoBig = 0;
        }

    }
    console.log($rootScope.users);
}]);