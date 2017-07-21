(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','AUTH_SERVER_BASE_URL'];
    function LoginController($location, AuthenticationService, FlashService,AUTH_SERVER_BASE_URL) {
        var vm = this;
        vm.login = login;
       
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
             alert(AUTH_SERVER_BASE_URL);
            vm.dataLoading = true;
            
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
