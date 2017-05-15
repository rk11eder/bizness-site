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

  canvas.width = 1000;
	canvas.height = 700;

  var c = canvas.getContext('2d');
	var img = document.getElementById("nigga");
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

	/*	c.beginPath();
		c.fillStyle = 'rgba(255, 0, 0, 0.5)';
    c.arc(200, 200, 30, 0, Math.PI * 2, false);
		c.strokeStyle = 'blue';
		c.stroke();*/

	function Circle(x,y,dx,dy,radius){
			this.x = x;
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			this.radius = radius;

			this.draw = function(){
				c.beginPath();
				c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
				c.strokeStyle = 'blue';
				c.stroke();
			}

			this.update = function(){
					if(this.x + this.radius > innerWidth || this.x -  this.radius <0){
						this.dx = -this.dx;
					}

					if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
						this.dy = -this.dy;
					}

					this.x += this.dx;
					this.y += this.dy;

					this.draw();
			}		
	}	

	/*var x = Math.random() * innerWidth;
	var y = Math.random() * innerHeight;
	var dx = (Math.random() - 0.5) * 8;
	var dy = (Math.random() - 0.5) * 8;
	var radius = 30;*/
/*var circle = new Circle(200, 200, 3, 3,30);*/
var circleArray = [];

	for(var i = 0; i < 50; i++){
			var x = Math.random() * innerWidth;
			var y = Math.random() * innerHeight;
			var dx = (Math.random() - 0.5) * 8;
			var dy = (Math.random() - 0.5) * 8;
			var radius = 30;
			circleArray.push(new Circle(x,y,dx,dy,radius));
			
	}


	function Quad(x,y,z,t,dx,dy){
			this.x = x;
			this.y = y;
			this.z = z;
			this.t = t;
			this.dx = dx;
			this.dy = dy;
			

			this.draw = function(){
				c.beginPath();
				c.rect(this.x,this.y,this.z,this.t);	
				c.strokeStyle = 'blue';
				c.stroke();
			}

			this.update = function(){
					if(this.x - 20 > 1000 || this.x <0){
						this.dx = -this.dx;
					}
					

					if(this.y > 700 || this.y < 0){
						this.dy = -this.dy;
					}

					this.x += this.dx;
					this.y += this.dy;

					this.draw();
			}		
	}	

	/*var x = Math.random() * innerWidth;
	var y = Math.random() * innerHeight;
	var dx = (Math.random() - 0.5) * 8;
	var dy = (Math.random() - 0.5) * 8;
	var radius = 30;*/
/*var circle = new Circle(200, 200, 3, 3,30);*/
var quadArray = [];

	for(var i = 0; i < 50; i++){
			var x = Math.random() * canvas.width;
			var y = Math.random() * canvas.height;
			var z = 20;
			var t = 20;
			var dx = (Math.random() - 0.5) * 2;
			var dy = (Math.random() - 0.5) * 2;
			quadArray.push(new Quad(x,y,z,t,dx,dy));
			
	}



/*	// Filled triangle
    c.beginPath();
    c.moveTo(25, 25);
    c.lineTo(105, 25);
    c.lineTo(25, 105);
    c.fill();*/

console.log(canvas.width);

		


		function animate(){
			requestAnimationFrame(animate);

			c.clearRect(0, 0 , innerWidth, innerHeight);
			

		/*	for (var i = 0; i < circleArray.length; i++){
					circleArray[i].update();
			}*/

			for (var i = 0; i < quadArray.length; i++){
					quadArray[i].update();
			}
			
		}

		animate();

  console.log(canvas);
  

}]);