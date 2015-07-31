(function(){
    "use strict";
    angular.module("LayoutManagement").directive("cssChange",CssChangeDirective);
    CssChangeDirective.$inject=["DefaultLayoutFactory"];
    function CssChangeDirective(DefaultLayoutFactory){
        var directive={};
        directive.link=function(scope,element,attrs,ngScope){
            var selectedDiv=attrs.cssChange;
            element.on('click',function(e){
                e.stopPropagation();
               scope.getCss(selectedDiv);
            });
        }
        return directive;
    };
})();