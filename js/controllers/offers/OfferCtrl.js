(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('OfferCtrl', OfferCtrl);

    OfferCtrl.$inject = ['$scope', 'OffersService', 'CharactService', 'ValuesService', 'CatalogService', '$stateParams', '$rootScope'];

    function OfferCtrl($scope, OffersService, CharactService, ValuesService, CatalogService, $stateParams, $rootScope){
        var id = $stateParams.id;
        var offer = OffersService.getById(id);
        var catalog = CatalogService.getById(offer.catalog);
        $scope.log = log;
        $scope.values = {};
        $scope.characts = [];
        $scope.offer = offer;
        $scope.catalog = catalog.name;
        var i, val, char;
        for(i in catalog.characts){
            char = CharactService.getById(catalog.characts[i]);
            $scope.characts.push(char);
        }
        for(i in offer.values){
            val = ValuesService.getById(offer.values[i]);
            $scope.values[val.charact] = val;
        }
        function log(){
            $rootScope.$broadcast('log', offer.additional);
        }
    }
})();