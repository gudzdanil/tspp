(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('OfferListCtrl', OfferListCtrl);

    OfferListCtrl.$inject = ['$scope', 'OffersService', 'CatalogService', 'ApiService'];

    function OfferListCtrl($scope, OffersService, CatalogService, ApiService){
        $scope.catalogNames = {};
        ApiService.offer.getAll().then(function(response){
            $scope.offers = response;
            var i;
            for(i in response){
                (function(ind) {
                    ApiService.catalog.getById(response[ind].catalog).then(function (catal) {
                        $scope.catalogNames[ind] = catal[0].name;
                    });
                })(i);
            }
        }, function(err){
            console.log(err);
            alert('Ошибка получения списка оставленых заявок!');
        });

        $scope.remove = function(id, index){
            ApiService.offer.changeStatus(id, -1).then(function(response){
                $scope.offers[index].status = -1;
            }, function(err){
                alert('Ошибка удаления заявки!');
                console.log(err);
            });
        }
    }
})();
