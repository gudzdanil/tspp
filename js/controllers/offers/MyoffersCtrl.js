(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('MyoffersCtrl', MyoffersCtrl);

    MyoffersCtrl.$inject = ['$scope', 'OffersService', 'CatalogService'];

    function MyoffersCtrl($scope, OffersService, CatalogService){
        $scope.offers = OffersService.precreated;
        $scope.getCatalog = CatalogService.getById;
        $scope.remove = OffersService.remove;
    }
})();