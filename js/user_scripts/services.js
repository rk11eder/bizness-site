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
    this.get_projetos = function(lang){
        var deferred = $q.defer();
        $http.get('server/get_projetos.php?lang='+lang+'&data='+(Math.random()),{ cache: false}).success(function(data, status) {
            deferred.resolve(data);
        }).error(function(data, status) {
            deferred.reject(data);
        });

        return deferred.promise;
    }
    this.get_projeto_aberto = function(id,lang){
        var deferred = $q.defer();
        $http.post('server/get_projeto_aberto.php?lang='+lang+'&data='+(Math.random()),{'id':id},{ cache: false}).success(function(data, status) {
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
}]);