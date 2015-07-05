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