(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$scope', 'ROLES', 'ApiService'];

    function RegisterCtrl($scope, ROLES, ApiService){
        $scope.roles = {};
        angular.forEach(ROLES, function(val, key){
            if(val !== 'Администратор'){
                $scope.roles[key] = val;
            }
        });
        $scope.register = ApiService.register;
    }
})();