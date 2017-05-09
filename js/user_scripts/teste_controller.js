'use strict';

/*exemplo controller*/
arquitetaApp.controller('testeCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location', function testeCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location){

	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });

		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('PROJECTSTART');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);

    // var promise_preco = services.get_preco();
    //     promise_preco.then(
    //     function(response){
    //       $scope.preco= response;
    //       console.log($scope.preco);
    //       }
    // );


    
}]);