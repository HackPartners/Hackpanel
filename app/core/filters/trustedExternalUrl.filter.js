/*global angular, console*/


angular.module("Hackpanel")
    .filter('trustedExternalUrl', ['$sce', function ($sce) {
        "use strict";
        return function (val) {
            return $sce.trustAsResourceUrl(val);
        };
    }]);
