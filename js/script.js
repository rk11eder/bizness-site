
'use strict';

/* App Module */

var arquitetaApp = angular.module('arquitetaApp', [
  'ngRoute',
  'ngSanitize',
  'services',
  'uiGmapgoogle-maps',
  'ngAnimate'
]);

/*EXEMPLO ROUTING*/
arquitetaApp.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/'+lang+'/home', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl',
        resolve:{
          items: ['$rootScope','services', function($rootScope,services){
            $rootScope.area_sel = 'home';
              $rootScope.sub_area_sel = '';
            $rootScope.menu_mobile_open = false;
            $rootScope.array_tags = [];
             var promise = services.insta();
            return promise;
          }]
        }
      }).
    when('/'+lang+'/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'portfolioCtrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'portfolio';
                $rootScope.sub_area_sel = '';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                
                return 1;
            }]
        }
    }).
    when('/'+lang+'/portfolio2', {
        templateUrl: 'views/portfolio2.html',
        controller: 'portfolio2Ctrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'portfolio';
                $rootScope.sub_area_sel = 'portfolio2';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                
                return 1;
            }]
        }
    }).
    when('/'+lang+'/contactos', {
        templateUrl: 'views/contactos.html',
        controller: 'contactosCtrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'contactos';
                $rootScope.sub_area_sel = '';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                var promise = services.insta();
                return promise;
            }]
        }
    }).
    when('/'+lang+'/sobrenos', {
        templateUrl: 'views/sobrenos.html',
        controller: 'sobrenosCtrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'sobrenos';
                $rootScope.sub_area_sel = '';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                var promise = services.insta();
                return promise;
            }]
        }
    }).
      // when('/'+lang+'/projects/:id', {
      //   templateUrl: 'views/project.html',
      //   controller: 'projectCtrl',
      //   resolve:{
      //     items: ['$rootScope','services','$route', function($rootScope,services,$route){
           
      //       $rootScope.area_sel = 'project';
      //       $rootScope.menu_mobile_open = false;
      //       $rootScope.array_tags = [];
      //       // var promise = services.get_posts($rootScope.array_tags,0,8,lang); 
      //       console.log($route.current.params.id,lang+"ois"); 
      //       return services.get_projeto_aberto($route.current.params.id,lang);
      //     }]
      //   }
      // }).
      otherwise({
        redirectTo: '/'+lang+'/home'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });

}]);


/*exemplo codigo global*/
arquitetaApp.run(['$rootScope','services',function($rootScope, services){
  
  /*GET LANG*/
  $rootScope.lang = lang;
  $rootScope.lang_array = array_lang;
  $rootScope.menuMobileControler=2;
  $rootScope.pathgeral = pathgeral;
  
}]);
'use strict';


var services = angular.module('services', []);

services.service('services',['$http','$q','$location','$window', function ($http,$q,$location,$window) {
    /*EXEMPLO SERVICO*/
    this.get_posts = function(array_tags,limit_ini,limit_final,lang){
        var deferred = $q.defer();
        $http.post('server/get_posts.php?data='+(Math.random()),{'array_tags': array_tags,'limit_ini':limit_ini,'limit_final':limit_final},{ cache: false}).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }
    this.send_form = function(item){
        var deferred = $q.defer();
        $http.post('server/send_form.php?data='+(Math.random()),{'item':item},{ cache: false}).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }
    this.insta = function(){
        
        var deferred = $q.defer();
        $http.post('server/insta2.php?data='+(Math.random()),{ cache: false}).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }
  
}]);

/*servico para mudar page title (SEO)*/
services.service('PageTitle',['$rootScope','$rootElement', function($rootScope,$rootElement) {
  return {
    setTitle: function(newTitle) {
      $rootScope.titlePage = newTitle; 
      angular.element($rootElement.find('meta[name=\'twitter:title\']')[0]).attr('content',newTitle);
      angular.element($rootElement.find('meta[property=\'og:title\']')[0]).attr('content',newTitle);
      
    },
    setDesc: function(newDesc) {
      angular.element($rootElement.find('meta[name=description]')[0]).attr('content',newDesc);
      angular.element($rootElement.find('meta[property=\'og:description\']')[0]).attr('content',newDesc);
      angular.element($rootElement.find('meta[name=\'twitter:description\']')[0]).attr('content',newDesc);
    }
  };
}]);arquitetaApp.directive('menu', [ 'services','$rootScope', function (services,$rootScope) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
      
      scope.isActive = false;
      scope.activeButton = function() {
        scope.isActive = !scope.isActive;
      };
        scope.changeClass = function(){
            if ($rootScope.menuMobileControler === 2){

                $rootScope.menuMobileControler = 1;
            }
        };


      scope.changelangPT =  function(){
          window.location.assign(pathgeral+'pt/'+scope.area_sel)
          console.log();   
      };
     scope.changelangEN =  function(){
          window.location.assign(pathgeral+'en/'+scope.area_sel)
          console.log();   
      };
      scope.changelangGE =  function(){
          window.location.assign(pathgeral+'ge/'+scope.area_sel)
          console.log();   
      };
      scope.changeMenu = function () {
          // console.log($rootScope.hide_menu);
          if ($rootScope.hide_menu === 1){
              $rootScope.hide_menu = 2;
              $rootScope.hide__botao_menu = 2;
          }
          else {
              $rootScope.hide_menu = 1;
              $rootScope.hide_botao_menu= 1;
          }
          console.log($rootScope.hide_menu);
      };
    

    },
    templateUrl: 'templates/menu.html'
  };
}]);

arquitetaApp.directive('footer', [function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
     
    },
    templateUrl: 'templates/footer.html'
  };
}]);

/**
 * Created by Eder Barbosa on 15/05/2017.
 */
'use strict';

/*exemplo controller*/
arquitetaApp.controller('contactosCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http','uiGmapGoogleMapApi', function contactosCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http,uiGmapGoogleMapApi){

    /*CLICKS GOOGLE MAPS*/
    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });


    /*SET TITLE PAGE SEO*/
    PageTitle.setTitle('PROJECTSTART');
    PageTitle.setDesc($rootScope.lang_array.descricao_page);


    var styleArray= [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
        }
    ]



    $scope.map = {center: {latitude: 38.703505, longitude: -9.178821 }, zoom: 18 };
    $scope.options = {scrollwheel: false, styles: styleArray, mapTypeControl: false, };
    
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 38.703505,
            longitude: -9.178821
        },
        /*options: {icon:"img/mapa_pin.png"},*/

    };





}]);'use strict';

/*exemplo controller*/
arquitetaApp.controller('homeCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function homeCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

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
  console.log($scope.url_first_foto);
  /*RESIZE WINDOW*/
	var w = angular.element($window);
	$scope.getWindowDimensions = function () {
		return {
		   'h': w.height(),
		   'w': w.width()
		};
	};


	$scope.send_form=function(formulario){
		console.log($scope.formulario);
		console.log(toString(formulario.$invalid));
		if(!$scope.formulario.$invalid){
            services.send_form($scope.form);
		}

	}
  

}]);
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
'use strict';

/*exemplo controller*/
arquitetaApp.controller('portfolioCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function portfolioCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

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
/*	var w = angular.element($window);
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
		c.beginPath();
		c.fillStyle = 'rgba(255, 0, 0, 0.5)';
    c.arc(200, 200, 30, 0, Math.PI * 2, false);
		c.strokeStyle = 'blue';
		c.stroke();



  console.log(canvas);*/


  

}]);'use strict';

/*exemplo controller*/
arquitetaApp.controller('sobrenosCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function sobrenosCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

	/*CLICKS GOOGLE MAPS*/
  $scope.$on('$viewContentLoaded', function(event) {
    $window.ga('send', 'pageview', { page: $location.url() });  
  });

		
	/*SET TITLE PAGE SEO*/
  	PageTitle.setTitle('PROJECTSTART');
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

}]);'use strict';

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