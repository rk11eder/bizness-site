'use strict';

/*exemplo controller*/
biznessApp.controller('portfolioCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function portfolioCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });

		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('PROJECTSTART');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);

   $scope.users=items;
   console.log($scope.users);

           $scope.lado=0;
            for(var i=0; i<$scope.users.length;i++){
                if ($scope.lado==0) {
                    $scope.users[i].lado = 0;
                    $scope.lado = "1";
                    console.log("grgrereg")
                } else {
                    $scope.users[i].lado = 1;
                    $scope.lado = 0;
                    console.log("dsvvds")
                }
           }



console.log($scope.users);




}]);