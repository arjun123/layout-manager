;(function () {
    "use strict";

    var selectedLayouts=[];
    var selectedKeys=[];

    LayoutFactory.$inject=["$localStorage","DefaultLayoutFactory","$http","CONSTANT"];
    angular.module("LayoutManagement").factory("LayoutFactory", LayoutFactory);
    function LayoutFactory($localStorage,DefaultLayoutFactory,$http,CONSTANT) {

        var LayoutServices = {};
        var userDefinedCss={};

        /**
         * Get count of object property
         * @param objectToBeCounted
         * @returns {Number}
         */
        LayoutServices.getObjectCount = function (objectToBeCounted) {
            return Object.keys(objectToBeCounted).length;
        };
        /**
         * Add selected layout by user
         * @param object layout
         */
        LayoutServices.addSelectedLayout=function(layout){
            selectedLayouts.push(layout);
            $localStorage.user.selectedLayouts.push(layout);
        };
        /**
         * Get selected layouts by the user
         * @returns {Array}
         */
        LayoutServices.getSelectedLayouts=function(){
            return selectedLayouts;
        };
        /**
         * Set user selected layouts
         * @param array layoutKeys keys of default layouts selected by user
         */
        LayoutServices.setSelectedLayouts=function(layoutKeys){
            var userSelectedLayouts=[];

            angular.forEach(layoutKeys, function (v, k) {
                userSelectedLayouts.push(DefaultLayoutFactory.getSpecificDefaultLayout(v));
            });

            LayoutServices.resetSelectedLayouts(userSelectedLayouts);
            $localStorage.user.selectedLayouts=userSelectedLayouts;

            LayoutServices.setSelectedKeys(layoutKeys);
        };
        /**
         * Reset selected Layouts
         * @param selectedLayoutsList
         */
        LayoutServices.resetSelectedLayouts=function(selectedLayoutsList){
            selectedLayouts=selectedLayoutsList;
        };
        /**
         * Get specific selected layout
         * @param key
         * @returns {*}
         */
        LayoutServices.getSpecificSelectedLayout=function(key){
            return selectedLayouts[key];
        };
        /**
         * Set selected keys of the layouts selected by user
         * @param keys
         */
        LayoutServices.setSelectedKeys=function(keys){
            selectedKeys=keys;
            $localStorage.user.selectedKeys=keys;
        };
        /**
         * Get keys of the default layout selected by the user
         * @returns {Array}
         */
        LayoutServices.getSelectedKeys=function(){
            return selectedKeys;
        };
        /**
         * Gets a link to the generated layout package
         * @param layoutInfo
         * @returns {*}
         */
        LayoutServices.generateLayout=function(layoutInfo){
            return $http({
                method:"POST",
                url:CONSTANT.BASE_URL+'layout/generate',
                data:layoutInfo
            });
        };
        /**
         * Parse and generate complete css for a layout
         * @param info
         * @param children
         * @param iteration
         * @returns {*}
         */
        LayoutServices.setDivCss = function (css, children) {
            var info={
                hasChild:false,
                css:css
            }
            angular.forEach(children, function (v, k) {
                this.css=LayoutServices.addChildCss(this.css, v);
                if (v.hasOwnProperty("child")) {
                    this.hasChild = true;
                    LayoutServices.setDivCss(this.css, v.child);
                }
            }, info);
            if (!info.hasChild) {
                return info;
            }
        };
        /**
         * Generate css for a div
         * @param divName
         * @param cssObject
         * @returns {string}
         */
        LayoutServices.generateCss=function(divName,cssObject){
            var css="\n."+divName+"{\n";
            angular.forEach(cssObject,function(v,k){
                css+="\t"+k+":"+v+";\n";
            },css);
            css+="}\n";
            return css;
        };
        /**
         * Append css to the layout css
         * @param css
         * @param child
         * @returns {*}
         */
        LayoutServices.addChildCss=function(css,child){
            css+="\n."+child.className+"{\n";
            angular.forEach(child.css,function(v,k){
                css+="\t"+k+":"+v+";\n";
            },css);
            css+="}\n";
            return css;
        }
        /**
         * Extends user defined css
         * @param css
         */
        LayoutServices.extendUserDefinedCss=function(css){
            angular.extend(userDefinedCss,css);
            $localStorage.user.css=userDefinedCss;
        }
        /**
         * Get user defined css for specific div
         * @returns {{}}
         */
        LayoutServices.getUserDefinedCss=function(){
            return userDefinedCss;
        }
        return LayoutServices
    }

})();
