
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
            $rootScope.menu_mobile_open = false;
            $rootScope.array_tags = [];
             var promise = services.insta();  
            return promise;
          }]
        }
      }).
    when('/'+lang+'/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'portefolioCtrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'portfolio';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                var promise = services.insta();
                return promise;
            }]
        }
    }).
    when('/'+lang+'/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'portefolioCtrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'portfolio';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                var promise = services.insta();
                return promise;
            }]
        }
    }).
    when('/'+lang+'/portfolio2', {
        templateUrl: 'views/portfolio2.html',
        controller: 'portefolio2Ctrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'portfolio2';
                $rootScope.menu_mobile_open = false;
                $rootScope.array_tags = [];
                var promise = services.insta();
                return promise;
            }]
        }
    }).
    when('/'+lang+'/contactos', {
        templateUrl: 'views/contactos.html',
        controller: 'contactosCtrl',
        resolve:{
            items: ['$rootScope','services', function($rootScope,services){
                $rootScope.area_sel = 'contactos';
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

  $rootScope.pathgeral = pathgeral;
  
}]);'use strict';


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
        $http.post('server/insta.php?data='+(Math.random()),{ cache: false}).success(function(data, status) {
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
}]);arquitetaApp.directive('menu', [ 'services', function (services) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function (scope, elem, attrs) {
      
      scope.isActive = false;
      scope.activeButton = function() {
        scope.isActive = !scope.isActive;
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
arquitetaApp.controller('contactosCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function contactosCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

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

  	canvas.width = w.width();
	canvas.height = 700;

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
				c.strokeStyle = 'blue';
				c.stroke();
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
				c.fillStyle = "black";
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
			var d = 10;
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

  console.log(canvas);
  

}]);'use strict';

/*exemplo controller*/
arquitetaApp.controller('portfolio2Ctrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http', function portfolio2Ctrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http){

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