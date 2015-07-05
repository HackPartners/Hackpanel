/*global angular */

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
    ]);