(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('OfferCtrl', OfferCtrl);

    OfferCtrl.$inject = ['$scope', 'OffersService', 'CharactService', 'ValuesService', '$stateParams', '$rootScope', 'ApiService'];

    function OfferCtrl($scope, OffersService, CharactService, ValuesService, $stateParams, $rootScope, ApiService){
        var i, val, char;
        var id = $stateParams.id;
        var offer = OffersService.getById(id);
        ApiService.catalog.getAll().then(function(response){
            $scope.catalogs = response;
            updateCharacts($scope.offer.catalog);
        }, function(err){
            console.log(err);
            alert("Ошибка получения списка каталогов!");
        });
        ApiService.charact.getAll().then(function(response){
            $scope.characts = response;
        }, function(err){
            console.log(err);
            alert("Ошибка получения списка характеристик!");
        });
        $scope.log = log;
        $scope.values = {};
        $scope.characts = [];
        $scope.offer = offer;
        offer.catalog = offer.catalog.toString();
        $scope.$watch('offer.catalog', updateCharacts);
        function updateCharacts(newVal){
            $scope.characts = [];
            if($scope.catalogs) {
                var cat = $scope.catalogs.filter(function (el) {
                    return el.id == newVal;
                })[0];
                for (i in cat.characts) {
                    ApiService.charact.getById(cat.characts[i]).then(function (response) {
                        if (response.data != -1 && response.data[0]) {
                            char = response.data[0];
                            $scope.characts.push(char);
                        }
                        else {
                            alert("Ошибка получения характеристик!");
                        }
                    }, function (err) {
                        console.log(err);
                        alert("Ошибка получения характеристик!");
                    });
                }
            }
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