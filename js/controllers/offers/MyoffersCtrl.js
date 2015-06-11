(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('MyoffersCtrl', MyoffersCtrl);

    MyoffersCtrl.$inject = ['$scope', 'OffersService', 'CatalogService', 'ApiService', 'AuthData'];

    function MyoffersCtrl($scope, OffersService, CatalogService, ApiService, AuthData){
        $scope.catalogNames = {};
        ApiService.offer.getByUser(AuthData.data.id).then(function(response){
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
            ApiService.offer.remove(id).then(function(response){
                $scope.offers.splice(index, 1);
            }, function(err){
                alert('Ошибка удаления заявки!');
                console.log(err);
            });
        }
    }
})();