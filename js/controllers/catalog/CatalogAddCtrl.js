(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CatalogAddCtrl', CatalogAddCtrl);

    CatalogAddCtrl.$inject = ['$scope', 'CatalogService', 'CharactService'];

    function CatalogAddCtrl($scope, CatalogService, CharactService){
        $scope.characts = CharactService.precreated;
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
            CatalogService.add(res);
            alert("Новая категория добавлена!");
            $scope.catalog = {};
        }
    }
})();