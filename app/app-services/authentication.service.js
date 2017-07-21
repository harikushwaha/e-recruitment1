(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService','AUTH_SERVER_BASE_URL','$q'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService,AUTH_SERVER_BASE_URL,$q) {
        var vm =this;
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function () {
                var response;
                UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = { success: true };
                        } else {
                            response = { success: false, message: 'Username or password is incorrect' };
                        }
                        callback(response);
                    });
            }, 1000);

    var userData = {
    grant_type:"password",
    username: username,
    password: password,
    client_id: 'ngAuthApp1',
    client_secret:'Secret'
    };

    
    

            /* Use this for real authentication
             ----------------------------------------------*/
            // $http.post('/api/authenticate', { username: username, password: password }).then(function(response){
            //         debugger;
            //        //callback(response);
            // })



            // this
            // $http.post(AUTH_SERVER_BASE_URL+'/token')
            // .success(function(data, status, headers, config) {
            //     $scope.movieContent = data;
            // },function(errors1){

            // });

            // is the same as
            // var promise = $http.post(AUTH_SERVER_BASE_URL+'/token');

            // promise.then(
            // function(payload) {
            //     $scope.movieContent = payload.data;
            // },function(error1){
            //     $scope.error1 = error1;
            // });
            //let data1='grant_type=password&username=hari.itsolution1@gmail.com&password=krishan123&client_id=ngAuthApp1&client_secret=Secret'

            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            // headers.append('Access-Control-Allow-Origin', '*');
            // headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

            console.log(JSON.stringify(userData));
            var tokenUrl=AUTH_SERVER_BASE_URL+'/token';
            var deferred = $q.defer();

            // $http({
            //     method: 'POST',
            //     url: tokenUrl,
            //     data: vm.userData,
            // }).success(function (data, status, headers, cfg) {
            //     // save the access_token as this is required for each API call. 
            //     var accessToken = data.access_token;
            //     // check the log screen to know currently back from the server when a user log in successfully.
            //     console.log(data);
            //     deferred.resolve(data);
            // }).error(function (err, status) {
            //     console.log(err);
            //     deferred.reject(status);
            // });


        //     $http({
        //         method: 'POST',
        //         headers :headers,
        //         url: tokenUrl,
        //         //headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        //         data: JSON.stringify(userData)

        //     }).then(function(response) {
        //         debugger;
        //         return response.data;
        //     }, function(error) {
        //         debugger;
        //         if(error && error.data){
        //         $rootScope.errorMessage = error.data.error;
        //         return $q.reject($filter('translate')('loginError'));
        //     }
        // });
        
         var data = "grant_type=password&username=" + username + "&password=" + password + "&client_id=ngAuthApp1&client_secret=Secret";
        console.log(data);
        // if (loginData.useRefreshTokens) {
        //     data = data + "&client_id=" + ngAuthSettings.clientId;
        // }
         $http.post(tokenUrl, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function(response){
            debugger;
         },function(error){
            debugger;
         })

    //     var dt=$http.defaults.headers;
    //    $http.defaults.headers.common.Accept = 'application/x-www-form-urlencoded';
    //    $http.defaults.headers.common.Authorization = 'Bearer';


        //$http.post(tokenUrl , userData).then(handleSuccess, handleError('Error updating user'));

        debugger;
            

    }
    
     function handleSuccess(res) {
         debugger;
            return res.data;
        }

        function handleError(error) {
             debugger;
            return function () {
                return { success: false, message: error };
            };
        }

        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();