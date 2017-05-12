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
   
/*$scope.ins = items.data;*/

/*
  console.log($scope.ins);*/
  /*RESIZE WINDOW*/
	var w = angular.element($window);
	$scope.getWindowDimensions = function () {
		return {
		   'h': w.height(),
		   'w': w.width()
		};
	};

   var canvas = document.querySelector('canvas');

  canvas.width = w.innerWidth();
	canvas.height = w.innerHeight();

  var c = canvas.getContext('2d');
/*	c.fillStyle = 'rgba(255, 0, 0, 0.5)';
  c.fillRect(100, 100, 100, 100);*/

/*	for(var i = 0; i < 3; i++){
		
    var x = Math.random() * w.innerWidth();
		
    var y = Math.random() * w.innerHeight();
		
    c.beginPath();
		c.fillStyle = 'rgba(255, 0, 0, 0.5)';
    c.arc(x, y, 30, 0, Math.PI * 2, false);
		c.strokeStyle = 'blue';
		c.stroke();
}*/

		c.beginPath();
		c.fillStyle = 'rgba(255, 0, 0, 0.5)';
    c.arc(200, 200, 30, 0, Math.PI * 2, false);
		c.strokeStyle = 'blue';
		c.stroke();



  console.log(canvas);
  

}]);