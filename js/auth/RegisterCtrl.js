(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$scope', 'ROLES', 'ApiService'];

    function RegisterCtrl($scope, ROLES, ApiService){
        $scope.roles = {};
        $scope.user2 = {
            role: "0"
        };
        angular.forEach(ROLES, function(val, key){
            if(val !== 'Администратор'){
                $scope.roles[key] = val;
            }
        });
        $scope.register = function(data, valid){
            if(valid){
                ApiService.register(data);
            }
        };
    }
})();