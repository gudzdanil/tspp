(function(){
    'use strict';

    angular.module('gifts')
        .directive('dlCharact', dlCharact);

    dlCharact.$inject = [];

    function dlCharact(){
        return {
            restrict: 'EA',
            scope: {
                inputType: '=',
                value: '='
            },
            replace: true,
            templateUrl: 'partials/directives/dl-charact.html',
            link: function(scope){
                if(scope.inputType){
                    if(scope.inputType.additional){
                        scope.inputType.additional = angular.fromJson(scope.inputType.additional);
                    }
                    if(scope.inputType.type == 'range'){
                        if(scope.value.val) {
                            scope.value.val = angular.fromJson(scope.value.val);
                        }
                        else{
                            scope.value.val = [];
                        }
                    }
                }
            }
        }
    }
})();