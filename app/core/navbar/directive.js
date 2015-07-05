/*global angular, $*/

angular.module("Hackpanel")
    .directive("hackNavbar", function () {
        'use strict';

        return {
            restrict: "E",
            templateUrl: "core/navbar/navbar.html",
            controller: "hackpanel.navbarController",
            controllerAs: "navbarController"
        };
    });