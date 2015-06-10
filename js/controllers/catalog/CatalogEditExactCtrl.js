(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CatalogEditExactCtrl', CatalogEditExactCtrl);

    CatalogEditExactCtrl.$inject = ['$scope', '$stateParams', 'ApiService'];

    function CatalogEditExactCtrl($scope, $stateParams, ApiService){
        $scope.loading = true;
        ApiService.catalog.getById($stateParams.id).then(function(response){
            $scope.loading = false;
            $scope.catalog = response[0];

            var i, obj = {};
            for(i in $scope.catalog.characts){
                obj[$scope.catalog.characts[i]] = 1;
            }
            $scope.catalog.characts = obj;

        }, function(err){
            console.log(err);
            alert('Не удалось загрузить данные каталога!');
            $scope.loading = false;
        });

        ApiService.charact.getAll().then(function(response){
            $scope.characts = response;
        }, function(err){
            console.log(err);
            alert('Не удалось загрузить список характеристик!');
        });

        $scope.save = save;

        function save(){
            var arr = [], i;
            for(i in $scope.catalog.characts){
                if($scope.catalog.characts[i] == 1){
                    arr.push(+i);
                }
            }
            var res = angular.copy($scope.catalog);
            res.characts = arr;
            res.id = +res.id;
            ApiService.catalog.save(res).then(function(response){
                alert("Каталог сохранен");
            }, function(err){
                alert("Не удалось сохранить каталог");
                console.log(err);
            });
        }
    }
})();