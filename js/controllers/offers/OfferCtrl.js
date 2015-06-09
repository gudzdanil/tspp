(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('OfferCtrl', OfferCtrl);

    OfferCtrl.$inject = ['$scope', 'OffersService', 'CharactService', 'ValuesService', 'CatalogService', '$stateParams', '$rootScope'];

    function OfferCtrl($scope, OffersService, CharactService, ValuesService, CatalogService, $stateParams, $rootScope){
        var id = $stateParams.id;
        $scope.offer = OffersService.getById(id);
        $scope.getCatalog = CatalogService.getById;
        $scope.values = [];
        $scope.log = log;
        var i;
        for(i in $scope.offer.values){
            $scope.values.push(ValuesService.getNameVal($scope.offer.values[i]));
        }
        function log(){
            $rootScope.$broadcast('log', $scope.offer.additional);
        }
    }
})();