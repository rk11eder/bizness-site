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
    this.get_destaques = function (lang) {
        var deferred = $q.defer();
        $http.get('server/get_destaques.php?lang='+lang+'&data=' + (Math.random()), {cache: false}).success(function (data, status) {
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }

    this.getPortefolio = function (lang) {


        var deferred = $q.defer();

        $http.get('server/portfolio_get_data.php?lang='+lang+'&data=' + (Math.random()), {cache: false}).success(function (data, status) {
            deferred.resolve(data);


        }).error(function (data, status) {
            deferred.reject(data);
        });
        return deferred.promise;
    }

    this.getPortefolio2 = function (url,lang) {

        var deferred = $q.defer();
        $http.post('server/portfolio_id_get_data.php?lang='+lang+'&data='+(Math.random()),{'url':url},{ cache: false}).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
    this.get_logos = function () {
        var deferred = $q.defer();
        $http.get('server/get_logos.php?data=' + (Math.random()), {cache: false}).success(function (data, status) {
            deferred.resolve(data);
        }).error(function (data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }


    this.getSize = function(dataPortfolio){

        var users = dataPortfolio;

console.log(users);
        var imagens=[];

        angular.forEach(users, function (user, key) {
            var img = new Image();
            img.src = user.logo;
            img.alt = key;
            imagens[key]=img;
        });
        angular.forEach(imagens, function (info, key) {
            info.onload= function () {

                users[key].largura = this.width;
                users[key].altura = this.height;





            }
        });

        return users;
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
}]);