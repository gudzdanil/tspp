(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CatalogEditCtrl', CatalogEditCtrl);

    CatalogEditCtrl.$inject = ['$scope', 'ApiService'];

    function CatalogEditCtrl($scope, ApiService){
        $scope.loading = true;
        ApiService.catalog.getAll().then(function(response){
            if(response.data != -1){

            }
            else{
                alert('Ошибка получения списка каталогов!');
            }
            $scope.loading = false;
        }, function(err){
            console.log(err);
            alert('Ошибка получения списка каталогов!');
            $scope.loading = false;
        });
        $scope.catalogs = CatalogService.precreated;
    }
})();