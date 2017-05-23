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

    $scope.users = [{logo:'img/logo_rtp_branco.svg',Cor:'red',activo:'1',destaque:'1',titulo:'rpt'},
					{logo:'img/logo_playstation_branco.svg',Cor:'blue',activo:'1',destaque:'0',titulo:'playstation'},
					{logo:'img/logo_microsoft_branco.svg',Cor:'gren',activo:'1',destaque:'1',titulo:'microsoft'},
					{logo:'img/logo_samsung_branco.svg',Cor:'yellow',activo:'1',destaque:'0',titulo:'samsung'}];

            $scope.imagens=[];
            angular.forEach($scope.users, function (user, key) {
                var img = new Image();
                img.src = user.logo;
                img.alt = key;
                $scope.imagens[key]=img;
            });
            angular.forEach($scope.imagens, function (info, key) {
                info.onload= function () {

                    $scope.users[key].largura = this.width;
                    $scope.users[key].altura = this.height;

                }
            });

    console.log( $scope.users);








}]);