;
(function () {
    "use strict";
    /**
     * Sets different layouts
     */
    angular.module("LayoutManagement").directive("setLayout", SetLayoutDirective);
    SetLayoutDirective.$inject = ["LayoutFactory", "CONSTANT", "DefaultLayoutFactory"];
    function SetLayoutDirective(LayoutFactory, CONSTANT, DefaultLayoutFactory) {
        var directive = {};
        directive.restrict = "A";
        directive.templateUrl = "angular/Dashboard/views/layout-template.html";
        directive.scope={
            selectedKey:"=setLayout"
        };
        directive.controller = "LayoutController";

        directive.link = function (scope, element, attrs, ngModel) {
            var layoutKeyValue = attrs.setLayout;

        };
        return directive;
    }
})();


