;
(function () {
    "use strict";
    angular.module("LayoutManagement").factory("DefaultLayoutFactory", DefaultLayoutFactory);
    DefaultLayoutFactory.$inject = ["$http","$localStorage"];
    /**
     * Contains Services related to default layouts
     * @returns {{}}
     * @constructor
     */
    function DefaultLayoutFactory($http,$localStorage) {
        var DefaultLayoutServices = {};
        /**
         * Default Layouts
         * @type {*[]}
         */
        var defaultLayouts;
        var defaultCss;
        /**
         * Common Css Properties
         * @type object
         */
        var cssProperties = {
            "width": 0,
            "padding-top": 0,
            "padding-right": 0,
            "padding-bottom": 0,
            "padding-left": 0,
            "background": "none"
        }
        DefaultLayoutServices.getObjectCount = function (objectToBeCounted) {
            return Object.keys(objectToBeCounted).length;
        };
        /**
         * Retrieve default layouts
         */
        DefaultLayoutServices.retrieveDefaultLayouts=function(){
            $http.get("angular/data/DefaultLayouts.json").success(function(response){
                defaultLayouts=response.layouts;
            })
        };
        DefaultLayoutServices.retrieveDefaultLayouts();


        /**
         * Retrieve default css
         */
        DefaultLayoutServices.retrieveDefaultCss=function(){
            $http.get("angular/data/DefaultCss.json").success(function(response){
                if(DefaultLayoutServices.getObjectCount($localStorage.user.css)==0){
                    $localStorage.user.css=response;
                }
                defaultCss=response;
            })
        };
        DefaultLayoutServices.retrieveDefaultCss();

        /**
         * Get all default Layouts
         * @returns {*[]}
         */
        DefaultLayoutServices.getAllDefaultLayouts = function () {
            return defaultLayouts;
        };
        /**
         * Get specific default layout
         * @param key
         * @returns {*}
         */
        DefaultLayoutServices.getSpecificDefaultLayout = function (key) {
            return defaultLayouts[key];
        };
        /**
         * Get specific div's default css
         * @param divName
         * @returns {*}
         */
        DefaultLayoutServices.getSpecificDivDefaultCss=function(divName){
            return defaultCss[divName];
        };

        /**
         * Get all the default css
         * @returns {*}
         */
        DefaultLayoutServices.getAllDefaultCss=function(){
            return defaultCss;
        };

        return DefaultLayoutServices;
    }


})();