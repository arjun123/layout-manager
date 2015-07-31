;(function () {
    "use strict";
    angular.module("LayoutManagement").controller("DashboardController", DashboardController);
    DashboardController.$inject = ["$scope", "$location", "LayoutFactory", "DefaultLayoutFactory"];
    function DashboardController($scope, $location, LayoutFactory, DefaultLayoutFactory) {
        $scope.layouts = DefaultLayoutFactory.getAllDefaultLayouts();
        $scope.user = {
            layouts: LayoutFactory.getSelectedKeys()
        };

        /**
         * next step of layout html/css generation
         */
        $scope.nextStep = function () {

            LayoutFactory.setSelectedLayouts($scope.user.layouts);
            $location.path('/settings');
        }
    }

})();
