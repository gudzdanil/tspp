(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('TopNavCtrl', TopNavCtrl);

    TopNavCtrl.$inject = ['$scope', 'AuthData', 'ApiService', 'GlobalService', '$rootScope', '$state'];

    function TopNavCtrl($scope, AuthData, ApiService, GlobalService, $rootScope, $state){
        $scope.userData = AuthData.data;
        $scope.isAuthorized = AuthData.isAuthorized;
        $scope.isAuthenticated = AuthData.isAuthenticated;
        $scope.logout = ApiService.logout;
        $scope.getRolePresentation = GlobalService.getRolePresentation;
        $scope.offers = $rootScope.offers;
        $scope.showLog = $scope.isAuthenticated('admin') && $state.current.name !== "main.home";
    }
})();