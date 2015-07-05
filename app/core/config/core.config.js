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
