(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CatalogEditCtrl', CatalogEditCtrl);

    CatalogEditCtrl.$inject = ['$scope', 'ApiService'];

    function CatalogEditCtrl($scope, ApiService){
        $scope.loading = true;
        ApiService.catalog.getAll().then(function(response){
            $scope.catalogs = response;
            $scope.loading = false;
        }, function(err){
            console.log(err);
            alert('Ошибка получения списка каталогов!');
            $scope.loading = false;
        });

        $scope.remove = function(id, index){
            ApiService.catalog.remove(+id).then(function(response){
                $scope.catalogs.splice(index, 1);
            }, function(err){
                console.log(err);
                alert('Не удалось удалить характеристику!');
            });
        }
    }
})();