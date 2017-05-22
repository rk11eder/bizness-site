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
   
		angular.element('body').bind("scroll", function(){

				var portfolio = $('.holder_backgrounds_portfolio2').offset().top;
				var currentScroll = $('.holder_backgrounds_portfolio2').offset().top; // get current position
				console.log(currentScroll);

				$scope.map = function(x, in_min, in_max, out_min, out_max){
					if(x<in_min) return out_min;
					if(x>in_max) return out_max;
					return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
				}

				//PERGUNTAR JOAO SE ISTO PODE FICAR ASSIM "PERFORMANCE"
				$scope.valor =	$scope.map(portfolio, -400, 0, 0.3, 0.9);
				$('.holder_backgrounds_portfolio2').css('opacity', $scope.valor);

						var conteudo = $('.conteudo_port_holder').offset().top;
						
						
						var parallaximage = $('.folio2_header');

				parallaximage.css('transform','translateY('+ -(currentScroll * .5) + 'px)' );
					




            $scope.$apply();
        });

			
			
  
$rootScope.hide_menu = 0;
    $rootScope.hide_botao_menu = 0;
}]);