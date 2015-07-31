;
(function () {
    angular.module("LayoutManagement").controller("LayoutController", LayoutController);
    LayoutController.$inject = ["$scope", "LayoutFactory", "DefaultLayoutFactory", "CONSTANT"];
    function LayoutController($scope, LayoutFactory, DefaultLayoutFactory, CONSTANT) {
        $scope.selectedLayout = LayoutFactory.getSpecificSelectedLayout($scope.selectedKey);
        $scope.selectedLayoutCss = "\n." + $scope.selectedLayout.className;
        $scope.selectedLayoutCss += "{\n";
        angular.forEach($scope.selectedLayout.css, function (v, k) {
            $scope.selectedLayoutCss += "\t" + k + ":" + v + ";\n";
        });
        $scope.selectedLayoutCss += "}\n";


        $scope.selectedDiv = CONSTANT.MAIN_CONTAINER;
        $scope.selectedDivCss = DefaultLayoutFactory.getSpecificDivDefaultCss($scope.selectedDiv);

        /**
         * Get css for a specific div on click
         * @param divName
         */
        $scope.getCss = function (divName) {
            $scope.selectedDiv = divName;
            $scope.selectedDivCss = DefaultLayoutFactory.getSpecificDivDefaultCss($scope.selectedDiv);
            $scope.$apply();
        };

        /**
         * Set css for specific div
         * @param divName
         */
        $scope.setLayoutCss = function (divName) {
            var extendedCss=extendCss(divName,$scope.selectedDivCss,$scope.selectedLayout.className);
            var css = {};
            css[divName] = extendedCss;
            LayoutFactory.extendUserDefinedCss(css);
        };

        $scope.$watch('selectedDivCss.width', function (newValue, oldValue) {
            generateCss();
        });
        $scope.$watch('selectedDivCss.padding', function (newValue, oldValue) {
            generateCss();
        });
        $scope.$watch('selectedDivCss.background', function (newValue, oldValue) {
            generateCss();
        });


        /**
         * Generate css once the css attributes are changed
         */
        var generateCss = function () {
            var css = "";
            $scope.selectedLayoutCss = LayoutFactory.generateCss($scope.selectedDiv, $scope.selectedDivCss);
        };


        /**
         * Extends the css with floating information
         * @param divName
         * @param css
         * @param layoutName
         * @returns {*}
         */
        var extendCss=function(divName,css,layoutName){
            var colMainFloatRight = ["col-2-left-layout", "col-3-left-layout", "col-3-l-left-layout"];
            var colMainFloatLeft = ["col-2-right-layout", "col-3-right-layout", "col-3-r-right-layout"];

            var mainFloatRight = ["col-3-l-left-layout", "col-3-right-layout"];
            var mainFloatLeft = ["col-3-r-right", "col-3-left"];

            if (divName === CONSTANT.MAIN_CONTAINER) {
                angular.extend(css, {"margin": "0 auto"});
            }
            if (divName === "col-main" && colMainFloatLeft.indexOf(layoutName) >= 1) {
                angular.extend(css, {"float": "left"});
            } else if (divName === "col-main" && colMainFloatRight.indexOf(layoutName) >= 1) {
                angular.extend(css, {"float": "right"});
            }

            if (divName == "main" && mainFloatLeft.indexOf(layoutName) >= 0) {
                angular.extend(css, {"float": "left"});
            } else if (divName == "main" && mainFloatRight.indexOf(layoutName) >= 0) {
                angular.extend(css, {"float": "right"});
            }
            return css;
        }

    }
})();