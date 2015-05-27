(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'ROLES', 'ApiService'];

    function LoginCtrl($scope, ROLES, ApiService){
        $scope.roles = ROLES;
        $scope.login = ApiService.login;
    }
})();