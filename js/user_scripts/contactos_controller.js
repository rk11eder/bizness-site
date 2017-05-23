/**
 * Created by Eder Barbosa on 15/05/2017.
 */
'use strict';

/*exemplo controller*/
biznessApp.controller('contactosCtrl', ['$scope', '$rootScope','$window','$timeout','$sce','items','services','$routeParams','PageTitle','$location','$http','uiGmapGoogleMapApi', function contactosCtrl($scope, $rootScope, $window,$timeout,$sce,items, services,$routeParams,PageTitle,$location,$http,uiGmapGoogleMapApi){

    /*CLICKS GOOGLE MAPS*/
    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
    });


    /*SET TITLE PAGE SEO*/
    PageTitle.setTitle('PROJECTSTART');
    PageTitle.setDesc($rootScope.lang_array.descricao_page);
    $scope.form = {};
    $scope.send_form=function(formulario){
        console.log($scope.formulario);
        console.log(toString(formulario.$invalid));
        if(!$scope.formulario.$invalid){
            services.send_form($scope.form);
        }

    };


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
    $scope.options = {scrollwheel: false, styles: styleArray, mapTypeControl: false/*, mapTypeId: 'satellite' */};
    
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 38.703505,
            longitude: -9.178821
        },
        /*options: {icon:"img/mapa_pin.png"},*/

    };





}]);