(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('TopNavCtrl', TopNavCtrl);

    TopNavCtrl.$inject = ['$scope', 'AuthData', 'ApiService', 'GlobalService'];

    function TopNavCtrl($scope, AuthData, ApiService, GlobalService){
        $scope.userData = AuthData.data;
        $scope.isAuthorized = AuthData.isAuthorized;
        $scope.isAuthenticated = AuthData.isAuthenticated;
        $scope.logout = ApiService.logout;
        $scope.getRolePresentation = GlobalService.getRolePresentation;
    }
})();