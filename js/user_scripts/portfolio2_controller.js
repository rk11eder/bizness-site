'use strict';

/*exemplo controller*/
biznessApp.controller('portfolio2Ctrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function portfolio2Ctrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });
  $rootScope.flag_loading = 2;
		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('Bizness');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);
	  var currentScroll2 = $('.holder_folio2_header').offset().top; // get current position

    $rootScope.projetosPortfolio=items.projetos;
	console.log($rootScope.projetosPortfolio);
    $rootScope.sub_area_sel = 'portfolio2';
    var w = angular.element($window);
    $scope.getWindowDimensions = function () {
        return {
            'h': w.height(),
            'w': w.width()
        };
    };


		angular.element(window).bind("scroll", function(){
            console.log("ola");
				var portfolio = $('.holder_backgrounds_portfolio2').offset().top;
				var currentScroll = $('.holder_backgrounds_portfolio2').offset().top; // get current position
				var currentScroll2 = $('.holder_folio2_header').offset().top; // get current position
               /* console.log(currentScroll);
                console.log(currentScroll2);*/
                console.log($(this).scrollTop());
             /*   console.log($('.holder_backgrounds_portfolio2').offset().top);*/
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
						var parallaxtexto = $('.holder_folio2_header');

				parallaximage.css('transform','translateY('+ -(currentScroll * .5) + 'px)' );

				parallaxtexto.css('transform','translateY('+ -(currentScroll2 * .4) + 'px)' );
					




            $scope.$apply();
        });
    $scope.$on('$destroy',function(){
        angular.element('body').unbind("scroll");

    });
    $scope.scroll_bottom = function(){
        console.log("asd");
        angular.element('body,html').animate({scrollTop: w.height()-63},500,function(){
            // controlo_scroll = 0;
        });
    };

			
			
  
$rootScope.hide_menu = 0;
    $rootScope.hide_botao_menu = 0;
	 var tempo = setTimeout(function(){ 
        
        $rootScope.flag_loading = 0;
        $rootScope.$apply();
          clearTimeout(tempo);
     }, 1000);



}]);

	

