/*global angular, console*/

angular.module("Hackpanel")
    .controller("hackpanel.hackpanelController", [
        "$rootScope",
        function ($rootScope) {
            'use strict';

            this.addresses = $rootScope.hackpanelAddresses;
        }
    ]);