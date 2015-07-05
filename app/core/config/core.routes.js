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
                    templateUrl: "core/hackpanel/hackpanel.html"
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "core/users/login/login.html"
                });
        }
    ]);
