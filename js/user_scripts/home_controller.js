'use strict';

/*exemplo controller*/
biznessApp.controller('homeCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http','$interval', function homeCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http, $interval){
    biznessApp.animation();
	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });

		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('PROJECTSTART');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);
   
$scope.ins = items.data;
$scope.form = {};

  console.log($scope.ins);
  /*RESIZE WINDOW*/
	var w = angular.element($window);
	$scope.getWindowDimensions = function () {
		return {
		   'h': w.height(),
		   'w': w.width()
		};
	};
    $scope.slides = [
        {image: 'img/singstar.jpg', description: 'Image 00'},
        {image: 'img/microsoft.jpg', description: 'Image 01'},
        {image: 'img/notebook.jpg', description: 'Image 02'},
        {image: 'img/folio2.jpg', description: 'Image 03'},
        {image: 'img/loewe.jpg', description: 'Image 04'}
    ];
    console.log($scope.slides);
    $scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;
    };
    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };
    var timer = $interval(function(){

        var max_slides =$scope.slides.length-1;
        if($scope.currentIndex<max_slides){
            $scope.currentIndex++;
        }else{
            $scope.currentIndex=0;
        }

        console.log($scope.currentIndex);
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
                console.log(eventKey);
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
        console.log("asd");
        console.log(vis());
        if(vis()){
            console.log("tab is visible - has focus");

                timer = $interval(function(){

                    var max_slides =$scope.slides.length-1;
                    if($scope.currentIndex<max_slides){
                        $scope.currentIndex++;
                    }else{
                        $scope.currentIndex=0;
                    }

                    console.log($scope.currentIndex);
                },8000);

        } else {
            $interval.cancel(timer);
            timer = null;
            // tween pause() code goes here
            console.log("tab is invisible - has blur");
        }
    });


    $scope.open_imagem_insta = function (index) {
        $window.open($scope.ins[index].link, '_blank');
    };
	$scope.send_form=function(formulario){
		console.log($scope.formulario);
		console.log(toString(formulario.$invalid));
		if(!$scope.formulario.$invalid){
            services.send_form($scope.form);
		}

	}
  

}]);
