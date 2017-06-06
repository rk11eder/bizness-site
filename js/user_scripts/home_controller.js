'use strict';

/*exemplo controller*/
biznessApp.controller('homeCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http','$interval', function homeCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http, $interval){

    biznessApp.animation();
	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });
  $rootScope.flag_loading = 2;
		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('Bizness');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);

      var promise = services.get_logos();
              promise.then(
                  function(response){
                     $scope.logos = response;

                  });
   
$scope.ins = items.data;
$scope.form = {};
$rootScope.contador_animation = 0;

    angular.element('html').bind("scroll", function(){
        console.log("ola");
				
				var currentScroll = $('.holder_destaques_home').offset().top; 
               

			    	var currentScroll2 = $('.fotos_destaques').offset().top; 
                


                
				
						
						
						var parallaximage = $('.holder_destaques_home');
						/*var parallaxtexto = $('.contactos_home_holder');*/

				 parallaximage.css('transform','translateY('+ -(currentScroll * .4) + 'px)' );

				/*parallaxtexto.css('transform','translateY('+ -(currentScroll2 * .4) + 'px)' );*/
					




            $scope.$apply();
        });










  /*RESIZE WINDOW*/
	var w = angular.element($window);
	$scope.getWindowDimensions = function () {
		return {
		   'h': w.height(),
		   'w': w.width()
		};
	};
    /*$scope.slides = [
        {image: 'img/singstar.jpg', titulo: 'SAMSUNG KNOX'},
        {image: 'img/microsoft.jpg', titulo: 'PLAYSTATION SING'},
        {image: 'img/notebook.jpg', titulo: 'SLIDES RTP'},
        {image: 'img/folio2.jpg', titulo: 'SAMSUNG'},
        {image: 'img/loewe.jpg', titulo: 'FACEBOOK'}
    ];*/

    $scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = function (index) {


        if(index!==$scope.currentIndex){
            $interval.cancel(timer);
            timer= null;
            timer = $interval(function(){
                var max_slides =$rootScope.destaques.length-1;
                if($scope.currentIndex<max_slides){
                    $scope.currentIndex++;
                }else{
                    $scope.currentIndex=0;
                }


            },8000);
        }
        $scope.currentIndex = index;

    };
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };
    var timer = $interval(function(){

        var max_slides =$rootScope.destaques.length-1;
        if($scope.currentIndex<max_slides){
            $scope.currentIndex++;
        }else{
            $scope.currentIndex=0;
        }



    },8000);

    var vis = (function(){
        var stateKey,
            eventKey,
            keys = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
            };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];

                break;
            }
        }
        return function(c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        }
    })();
    // check if current tab is active or not
    vis(function(){

        if(vis()){


                timer = $interval(function(){

                    var max_slides =$rootScope.destaques.length-1;
                    if($scope.currentIndex<max_slides){
                        $scope.currentIndex++;
                    }else{
                        $scope.currentIndex=0;
                    }


                },8000);

        } else {
            $interval.cancel(timer);
            timer = null;
            // tween pause() code goes here

        }
    });
    $scope.$on('$destroy',function(){
        if(timer){
            $interval.cancel(timer);
        }

         angular.element('body').unbind("scroll");

    });
    $scope.stopSlides= function () {

        if(timer){
            $interval.cancel(timer);
            timer= null;
        }else{
            timer = $interval(function(){

                var max_slides =$rootScope.destaques.length-1;
                if($scope.currentIndex<max_slides){
                    $scope.currentIndex++;
                }else{
                    $scope.currentIndex=0;
                }

            },8000);
        }
    }


    $scope.open_imagem_insta = function (index) {
        $window.open($scope.ins[index].link, '_blank');
    };
	$scope.send_form=function(formulario){

		if(!$scope.formulario.$invalid){
            services.send_form($scope.form);
            alert("Mensagem enviada com sucesso");
            $scope.form={};

        }

	}
   
    var tempo = setTimeout(function(){ 
        
        $rootScope.flag_loading = 0;
        $rootScope.$apply();
          clearTimeout(tempo);
     }, 1000);

   /* $rootScope.flag_loading = 0;*/
}]);
