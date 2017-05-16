'use strict';

/*exemplo controller*/
arquitetaApp.controller('sobrenosCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function sobrenosCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });

		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('PROJECTSTART');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);
   
/*RESIZE WINDOW*/
	var w = angular.element($window);
	$scope.getWindowDimensions = function () {
		return {
		   'h': w.height(),
		   'w': w.width()
		};
	};

   


			/*RESIZE WINDOW*/
	var w = angular.element($window);
	$scope.getWindowDimensions = function () {
		return {
		   'h': w.height(),
		   'w': w.width()
		};
	};



	$scope.resize_func = function(){
			var canvas = document.querySelector('canvas');

  	canvas.width = w.width();
	canvas.height = w.height() - (w.height() * 0.10);

	var c = canvas.getContext('2d');

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
				c.strokeStyle = '#34394f';
				c.fillStyle="#34394f";
				c.fill();
			}

			this.update = function(){
					if(this.x + 10 > canvas.width || this.x <0){
						this.dx = -this.dx;
					}
					

					if(this.y + 10 > canvas.height || this.y < 0){
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

	for(var i = 0; i < 20; i++){
			var x = Math.random() * (canvas.width - 10);
			var y = Math.random() * (canvas.height - 10);
			var z = 10;
			var t = 10;
			var dx = (Math.random() - 0.5) * 2;
			var dy = (Math.random() - 0.5) * 2;
			quadArray.push(new Quad(x,y,z,t,dx,dy));
			
	}

	function Tri(x,y,h,dx,dy){
			this.x = x;
			this.y = y;
			this.h = h;
			this.dx = dx;
			this.dy = dy;
			

			this.draw = function(){
				c.beginPath();
				c.moveTo(this.x, this.y );
				c.lineTo(this.x - this.h/2,this.y + this.h/2*Math.tan(60*Math.PI/180));
				c.lineTo(this.x + this.h/2, this.y + this.h/2*Math.tan(60*Math.PI/180));
				c.fillStyle = "#34394f";
				c.fill();
			}

			this.update = function(){
					if(this.x > (canvas.width - this.h/2)|| this.x <0){
						this.dx = -this.dx 
					}

					if( this.y + this.h/2 > canvas.height  || this.y < 0){
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
var triArray = [];
	
	for(var i = 0; i < 20; i++){
			
			var x = Math.random() * canvas.width;
			var y = Math.random() * canvas.height;
			var h = 10;
			var dx = (Math.random() - 0.5) * 2;
			var dy = (Math.random() - 0.5) * 2;
			triArray.push(new Tri(x,y,h,dx,dy));
			
	}

function Trirot(x,y,a,d,dx,dy){
			this.x = x;
			this.y = y;
			this.a = a;
			this.d = d;
			this.dx = dx;
			this.dy = dy;
			

			this.draw = function(){
				c.beginPath();

				var x1 = -Math.sin(a * Math.PI/180);
				var y1 = Math.cos(a * Math.PI/180);
				var xun1 = x1 / Math.sqrt(x1*x1+y1*y1);
				var yun1 = y1 / Math.sqrt(x1*x1+y1*y1);
				var p1x = this.x + xun1 * this.d;
				var p1y = this.y + yun1 * this.d;
				
				var x2 = -Math.sin((a + 120)* Math.PI/180);
				var y2 = Math.cos((a + 120)* Math.PI/180);
				var xun2 = x2 / Math.sqrt(x2*x2+y2*y2);
				var yun2 = y2 / Math.sqrt(x2*x2+y2*y2);
				var p2x = this.x + xun2 * this.d;
				var p2y = this.y + yun2 * this.d;

				var x3 = -Math.sin((a + 240)* Math.PI/180);
				var y3 = Math.cos((a + 240)* Math.PI/180);
				var xun3 = x3 / Math.sqrt(x3*x3+y3*y3);
				var yun3 = y3 / Math.sqrt(x3*x3+y3*y3);
				var p3x = this.x + xun3 * this.d;
				var p3y = this.y + yun3 * this.d;



				c.moveTo(p1x,p1y);
				c.lineTo(p2x,p2y);
				c.lineTo(p3x,p3y);
				c.fillStyle="#34394f";
				c.fill();
			}

			this.update = function(){
					if(this.x > canvas.width - this.d || this.x < this.d){
						this.dx = -this.dx 
					}

					if( this.y > canvas.height -this.d  || this.y < this.d){
						this.dy = -this.dy;
					}

					this.x += this.dx;
					this.y += this.dy;
				

					this.draw();
			}		
	}
   var trirotArray = [];
	
	for(var i = 0; i < 20; i++){
			var x = Math.random() * canvas.width;
			var y = Math.random() * canvas.height;
			var a = Math.random() * 120;
			var d = 8;
			var dx = (Math.random() - 0.5) * 2;
			var dy = (Math.random() - 0.5) * 2;
			trirotArray.push(new Trirot(x,y,a,d,dx,dy));
			
	}
	 console.log(trirotArray);

		


		function animate(){
			requestAnimationFrame(animate);

			c.clearRect(0, 0 , innerWidth, innerHeight);
		/*	for (var i = 0; i < circleArray.length; i++){
					circleArray[i].update();
			}*/

			for (var i = 0; i < quadArray.length; i++){
					quadArray[i].update();
			}

			/*for (var i = 0; i < triArray.length; i++){
					triArray[i].update();
			}*/

			for (var i = 0; i < trirotArray.length; i++){
					trirotArray[i].update();
			}
		}

		animate();


	};

	$scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
	   $scope.resize_func();
	}, true);

	w.bind('resize', function () {
		$scope.$apply();
	});

	w.bind('load', function () {
		$scope.resize_func();
		$scope.$apply();
	});

	$scope.$on('$viewContentLoaded', function() {
   	$scope.resize_func();
	});

	$scope.resize_func();

}]);