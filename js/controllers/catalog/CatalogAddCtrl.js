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
            CatalogService.add(catalog);
            alert("Новая категория добавлена!");
            $scope.catalog = {};
        }
    }
})();