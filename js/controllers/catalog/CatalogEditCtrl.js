(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CatalogEditCtrl', CatalogEditCtrl);

    CatalogEditCtrl.$inject = ['$scope', 'CatalogService'];

    function CatalogEditCtrl($scope, CatalogService){
        $scope.catalogs = CatalogService.precreated;
    }
})();