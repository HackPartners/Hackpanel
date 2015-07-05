/*global angular*/


angular.module('Hackpanel', [
    // External modules 
    'ui.router',
    'oc.lazyLoad'

    // Internal modules
]);
/*global angular, console*/

angular.module("Hackpanel")
    .run([
        "$rootScope",
        function ($rootScope) {
            'use strict';

            $rootScope.defaultAddress = "http://hackpartners.com";
            $rootScope.hackpanelAddresses = [$rootScope.defaultAddress];
            $rootScope.currentTab = 0;

            $rootScope.openAddress = function (address) {
                $rootScope.hackpanelAddresses[$rootScope.currentTab] = address;
            };
        }
    ]);

/*global angular*/

angular.module("Hackpanel")
    .config([
        "$stateProvider",
        "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            'use strict';

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('hackpanel', {
                    url: "/hackpanel",
                    controller: "hackpanel.hackpanelController",
                    controllerAs: "hackpanelController",
                    templateUrl: "app/core/hackpanel/hackpanel.html"
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "app/core/users/login/login.html"
                });
        }
    ]);

/*global angular, console*/


angular.module("Hackpanel")
    .filter('trustedExternalUrl', ['$sce', function ($sce) {
        "use strict";
        return function (val) {
            return $sce.trustAsResourceUrl(val);
        };
    }]);

/*global angular, console*/

angular.module("Hackpanel")
    .controller("hackpanel.hackpanelController", [
        "$rootScope",
        function ($rootScope) {
            'use strict';

            this.addresses = $rootScope.hackpanelAddresses;
        }
    ]);
/*global angular, console*/

angular.module("Hackpanel")
    .controller("hackpanel.navbarController", [
        "$rootScope",
        function ($rootScope) {
            'use strict';

            this.navbarController = "";
            this.openAddress = $rootScope.openAddress;
        }
    ]);
/*global angular, $*/

angular.module("Hackpanel")
    .directive("hackNavbar", function () {
        'use strict';

        return {
            restrict: "E",
            templateUrl: "app/core/navbar/navbar.html",
            controller: "hackpanel.navbarController",
            controllerAs: "navbarController"
        };
    });