(function () {
    'use strict';

    angular.module('app').config(config);
    config.$inject = ['$routeProvider', '$locationProvider'];

/*<div ng-controller="LocationController">
  <div ng-address-bar></div><br><br>
  <div>
    $location.protocol() = <span ng-bind="$location.protocol()"></span> <br>
    $location.host() = <span ng-bind="$location.host()"></span> <br>
    $location.port() = <span ng-bind="$location.port()"></span> <br>
    $location.path() = <span ng-bind="$location.path()"></span> <br>
    $location.search() = <span ng-bind="$location.search()"></span> <br>
    $location.hash() = <span ng-bind="$location.hash()"></span> <br>
  </div>
  <div id="navigation">
    <a href="http://www.example.com/base/first?a=b">/base/first?a=b</a> |
    <a href="http://www.example.com/base/sec/ond?flag#hash">sec/ond?flag#hash</a> |
    <a href="/other-base/another?search">external</a>
  </div>
</div>*/
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'app/modules/home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'app/modules/login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'app/modules/register/register.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: 'app/login' });
    }
})();