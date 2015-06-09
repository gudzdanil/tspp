(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'ROLES', 'ApiService', '$state'];

    function LoginCtrl($scope, ROLES, ApiService, $state){
        $scope.user = {};
        $scope.roles = ROLES;
        $scope.login = function(data, valid){
            if(valid){
                ApiService.login(data).then(function(){$state.go('main.home')});
            }
        };
        $scope.user.role = "0";
    }
})();