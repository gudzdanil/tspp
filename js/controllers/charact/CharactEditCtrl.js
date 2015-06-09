(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CharactEditCtrl', CharactEditCtrl);

    CharactEditCtrl.$inject = ['$scope', 'ApiService'];

    function CharactEditCtrl($scope, ApiService){
        $scope.loading = true;
        ApiService.charact.getAll().then(function(response){
            if(response.data != -1) {
                $scope.characts = response.data;
                $scope.loading = false;
            }
        }, function(err){
            console.log(err);
            alert("Ошибка получения списка характеристик!");
            $scope.loading = false;
        });
//        $scope.characts = CharactService.precreated;
    }
})();