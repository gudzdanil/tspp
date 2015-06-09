(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('OfferListCtrl', OfferListCtrl);

    OfferListCtrl.$inject = ['$scope', 'OffersService', 'CatalogService'];

    function OfferListCtrl($scope, OffersService, CatalogService){
        $scope.offers = OffersService.precreated;
        $scope.getCatalog = CatalogService.getById;
        $scope.remove = OffersService.remove;
    }
})();