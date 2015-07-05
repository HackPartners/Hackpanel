/*global angular, console*/

angular.module("Hackpanel")
    .service("hackpanel.moduleResolver", [
        "$http",
        "$ocLazyLoad",
        "$state",
        "WEBHOST",
        function ($http, $ocLazyLoad, $state, WEBHOST) {
            "use strict";

            this.resolveModule = function (moduleName) {

                var path = WEBHOST + "/modules/" + moduleName + "/" + moduleName + ".js";

                return $http.get(path)
                    .then(
                        function () {
                            return $ocLazyLoad.load(path);
                        },
                        function (error) {
                            if (error.status === 500 || error.status === 0) {
                                $state.go("hackpanel.module500", {
                                    moduleName: moduleName
                                });
                            } else {
                                $state.go("hackpanel.module404", {
                                    moduleName: moduleName
                                });
                            }
                        }
                    )
                    .then(
                        function () {
                            // Return the directive, which consist of the same name of the module

                            return "<" + moduleName + "></" + moduleName + ">";
                        },
                        function () {
                            $state.go("hackpanel.module500", {
                                moduleName: moduleName
                            });
                        }
                    );
            };
        }
    ])
    .config([
        "$stateProvider",
        "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            'use strict';

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "core/users/login/login.html"
                })
                .state('hackpanel', {
                    url: "/hackpanel",
                    controller: "hackpanel.hackpanelController",
                    controllerAs: "hackpanelController",
                    templateUrl: "core/hackpanel/hackpanel.html"
                })
                .state('hackpanel.module', {
                    url: "/:moduleName",
                    templateProvider: [
                        "$stateParams",
                        "hackpanel.moduleResolver",
                        function ($stateParams, moduleResolver) {

                            return moduleResolver.resolveModule($stateParams.moduleName);
                        }
                    ]
                })
                .state("hackpanel.module500", {
                    url: "/:moduleName/500",

                    templateUrl: "core/error-pages/module.500.html",
                    controllerAs: "hackpanelModule500",
                    controller: ["$stateParams", function ($stateParams) {
                        this.moduleName = $stateParams.moduleName;
                    }]
                })
                .state("hackpanel.module404", {
                    url: "/:moduleName/404",
                    templateUrl: "core/error-pages/module.404.html",
                    controllerAs: "hackpanelModule404",
                    controller: ["$stateParams", function ($stateParams) {
                        this.moduleName = $stateParams.moduleName;
                    }]
                });
        }
    ]);
