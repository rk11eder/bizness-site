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
    this.getSize = function(){

        var users = [{logo: 'img/logo_rtp_branco.svg', Cor: 'red', activo: '1', destaque: '1', titulo: 'rpt'},
            {logo: 'img/logo_playstation_branco.svg', Cor: 'blue', activo: '1', destaque: '1', titulo: 'playstation'},
            {logo: 'img/logo_microsoft_branco.svg', Cor: 'gren', activo: '1', destaque: '0', titulo: 'microsoft'},
            {logo: 'img/logo_microsoft_branco.svg', Cor: 'gren', activo: '1', destaque: '0', titulo: 'microsoft'},
            {logo: 'img/logo_samsung_branco.svg', Cor: 'yellow', activo: '1', destaque: '1', titulo: 'samsung'},

        ];

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