(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CatalogEditExactCtrl', CatalogEditExactCtrl);

    CatalogEditExactCtrl.$inject = ['$scope', 'CatalogService', 'CharactService', '$stateParams'];

    function CatalogEditExactCtrl($scope, CatalogService, CharactService, $stateParams){
        $scope.catalog = angular.copy(CatalogService.getById($stateParams.id));
        var i, obj = {};
        for(i in $scope.catalog.characts){
            obj[$scope.catalog.characts[i]] = 1;
        }
        $scope.catalog.characts = obj;
        $scope.characts = CharactService.precreated;
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
            CatalogService.save(res);
            alert("Каталог сохранен");
        }
    }
})();