/*****************************************************************************
 *
 * COPYRIGHT       :   
 *                     
 *                     
 *
 * $Source: app.run.js $
 * $Author: 
 * $Date: 
 * $Revision: 1.1.2.3 $
 *
 ******************************************************************************/

(function() {

  'use strict';

  //Route Configuration for the application
  angular
    .module('app')
    .run(runBlock);

  //Inject dependencies
  runBlock.$inject = ['$rootScope',
    '$location',
    '$window',
    '$cookies', 
    '$http'
  ];

  /**
   * @name runBlock
   * @desc Runs on app start
   * @param {Object} $rootScope - The angular root scope.
   * @param {Object} $location - The angular $location service
   * @param {Object} $window - The angular $window service
   * @param {String} ENV - The environment the app is running in
   * @param {String} AUTH_SERVER_BASE_URL - The base url for the auth server
   * @param {String} XPRESSION_SERVER_BASE_URL - The base url for the Xpression server
   * @param {String} NEW_AUTH_SERVER_BASE_URL - The base url for the new auth server
   * @param {Object} xpressionDataService - The xpression data service
   * @param {Object} applicationService - The application service
   * @param {Object} dashboardService - dashboard service object
   */
  function runBlock($rootScope,
    $location,
    $window,
    $cookies, 
    $http
  ) {



//alert('Run');
      // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        }
        )}
})();


