(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CatalogEditExactCtrl', CatalogEditExactCtrl);

    CatalogEditExactCtrl.$inject = ['$scope', 'CatalogService', 'CharactService', '$stateParams'];

    function CatalogEditExactCtrl($scope, CatalogService, CharactService, $stateParams){
        $scope.catalog = angular.copy(CatalogService.getById($stateParams.id));
        $scope.characts = CharactService.precreated;
        $scope.save = save;

        function save(){
            CatalogService.save($scope.catalog);
            alert("Каталог сохранен");
        }
    }
})();