(function(){
    'use strict';

    angular.module('gifts')
        .directive('fgCrit', fgCrit);

    fgCrit.$inject = [];

    function fgCrit(){
        return {
            restrict: 'EA',
            scope: {
                inputType: '=',
                value: '='
            },
            replace: true,
            templateUrl: 'partials/directives/fg-crit.html',
            link: function(scope){
                if(scope.inputType){
                    if(scope.inputType.additional){
                        scope.inputType.additional = angular.fromJson(scope.inputType.additional);
                    }
                    if(scope.inputType.type == 'range'){
                        if(scope.value && scope.value.val) {
                            scope.value.val = angular.fromJson(scope.value.val);
                        }
                        else{
                            scope.value = {val: []};
                        }
                    }
                    else if(scope.inputType.type == 'number' && scope.value){
                        scope.value.val = +scope.value.val;
                    }
                }
            }
        }
    }
})();