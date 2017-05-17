'use strict';

/*exemplo controller*/
arquitetaApp.controller('homeCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function homeCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });

		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('PROJECTSTART');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);
   
$scope.ins = items.data;
console.log("sad");

  console.log($scope.ins);
  $scope.url_first_foto = $scope.ins[0].images.standard_resolution.url;
  console.log($scope.url_first_foto);
  /*RESIZE WINDOW*/
	var w = angular.element($window);
	$scope.getWindowDimensions = function () {
		return {
		   'h': w.height(),
		   'w': w.width()
		};
	};

   
  

}]);
