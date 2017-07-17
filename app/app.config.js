(function () {
    'use strict';

    angular.module('app').config(config);
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider)
    {
        //alert('Config');
    }
})();