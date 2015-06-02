(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'ROLES', 'ApiService'];

    function LoginCtrl($scope, ROLES, ApiService){
        $scope.user = {};
        $scope.roles = ROLES;
        $scope.login = function(data, valid){
            if(valid){
                ApiService.login(data);
            }
        };
        $scope.user.role = "0";
    }
})();