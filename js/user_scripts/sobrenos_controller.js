'use strict';

/*exemplo controller*/
biznessApp.controller('sobrenosCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function sobrenosCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http,$document){

	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });
  $rootScope.flag_loading = 2;
  angular.element('body').scrollTop();
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('Bizness');
  	PageTitle.setDesc($rootScope.lang_array.descricao_page);
    $scope.ins = items.data;
   
/*RESIZE WINDOW*/
	var w = angular.element($window);
	$scope.getWindowDimensions = function () {
		return {
		   'h': w.height(),
		   'w': w.width()
		};
	};
    $scope.scroll_bottom = function(){

        angular.element('body,html').animate({scrollTop: w.height()-63},500,function(){
            // controlo_scroll = 0;
        });
    }



	$scope.resize_func = function(){
		var canvas = document.querySelector('canvas');
        var parent = angular.element(document.querySelector('#parent_canvas'));
		canvas.width = document.body.clientWidth;
		canvas.height = parent.height();
		var c = canvas.getContext('2d');

		var canvasPos = getPosition(canvas);
		var mouseX = 0;
		var mouseY = 0;
		var sqSize = 100;
		var xPos = 0;
		var yPos = 0;
		var dX = 0;
		var dY = 0;



		canvas.addEventListener("mousemove", setMousePosition, false);
 
		function setMousePosition(e) {
		mouseX = e.clientX - canvasPos.x;
		mouseY = e.clientY - canvasPos.y;
		
	}
	
	window.addEventListener("scroll", updatePosition, false);
	window.addEventListener("resize", updatePosition, false);

	function updatePosition() {
  		canvasPos = getPosition(canvas);
	}

	// Helper function to get an element's exact position
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll  + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
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

					
				/*
					if(this.x + 10 > canvas.width || this.x <0){
						this.dx = -this.dx;
					}
					

					if(this.y + 10 > canvas.height || this.y < 0){
						this.dy = -this.dy;
					}

					this.dx = mouseX - this.x;
					this.dy = (mouseY-300) - this.y;*/
					
			/*		this.x += (this.dx / 1000);
					this.y += (this.dy / 1000);*/

					/*this.x = mouseX;
					this.y = mouseY + 300;*/
					/*this.x += this.dx;
					this.y += this.dy;*/


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


var quadArray = [];

	for(var i = 0; i < 20; i++){
			var x = Math.random() * (canvas.width - 10);
			var y = Math.random() * (canvas.height - 10);
			var z = 10;
			var t = 10;
			var dx = (Math.random() - 0.5) * 0.5;
			var dy = (Math.random() - 0.5) * 0.5;
			quadArray.push(new Quad(x,y,z,t,dx,dy));
			
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
			var dx = (Math.random() - 0.5) * 0.5;
			var dy = (Math.random() - 0.5) * 0.5;
			trirotArray.push(new Trirot(x,y,a,d,dx,dy));
			
	}
	 /*console.log(trirotArray);*/

		


		function animate(){
			requestAnimationFrame(animate);

			c.clearRect(0, 0 , innerWidth, innerHeight);
		/*	for (var i = 0; i < circleArray.length; i++){
					circleArray[i].update();
			}*/

			for (var i = 0; i < quadArray.length; i++){
					quadArray[i].update();
			}
			
			// console.log(mouseY);

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

    

	 var tempo = setTimeout(function(){ 
        
        $rootScope.flag_loading = 0;
        $rootScope.$apply();
          clearTimeout(tempo);
     }, 1000);
}]).value('duScrollOffset', 30);