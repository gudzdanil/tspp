(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CatalogAddCtrl', CatalogAddCtrl);

    CatalogAddCtrl.$inject = ['$scope', 'CatalogService', 'CharactService', 'ApiService'];

    function CatalogAddCtrl($scope, CatalogService, CharactService, ApiService){
        $scope.loading = true;
        ApiService.charact.getAll().then(function(response){
            $scope.characts = response;
        }, function(err){
            console.log(err);
            alert("Ошибка получения списка характеристик!");
            $scope.loading = false;
        });
        $scope.save = save;

        function save(catalog){
            var arr = [], i;
            for(i in catalog.characts){
                if(catalog.characts[i] == 1){
                    arr.push(+i);
                }
            }
            var res = angular.copy(catalog);
            res.characts = arr;
            ApiService.catalog.add(res).then(function(response){
                alert("Новая категория добавлена!");
                $scope.catalog = {};
            }, function(err){
                alert('Не удалось сохранить новую категорию!');
                console.log(err);
            });
        }
    }
})();