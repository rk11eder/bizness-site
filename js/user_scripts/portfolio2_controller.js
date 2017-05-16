'use strict';

/*exemplo controller*/
arquitetaApp.controller('portfolio2Ctrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function portfolio2Ctrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });

		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('PROJECTSTART');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);
    $rootScope.hide_menu = 0;
    $rootScope.hide_botao_menu = 0;


  

}]);