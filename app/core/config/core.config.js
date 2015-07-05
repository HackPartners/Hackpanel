/*global angular, console*/

angular.module("Hackpanel")
    .config([
        "$sceDelegateProvider",
        "WEBHOST",
        function ($sceDelegateProvider, WEBHOST) {
            "use strict";

            $sceDelegateProvider.resourceUrlWhitelist([
                // Allow same origin resource loads.
                "self",
                // Allow loading from our assets domain.  Notice the difference between * and **.
                WEBHOST + "/**"
            ]);
        }
    ])
    .run([
        "$rootScope",
        "$state",
        function ($rootScope, $state) {
            'use strict';

            $rootScope.defaultAddress = "http://hackpartners.com";
            $rootScope.hackpanelAddresses = [$rootScope.defaultAddress];
            $rootScope.currentTab = 0;

            $rootScope.openAddress = function (address) {
                $rootScope.hackpanelAddresses[$rootScope.currentTab] = address;
                $state.go("hackpanel.module", { moduleName: address });
            };
        }
    ]);
