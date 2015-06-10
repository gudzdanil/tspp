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
            }
            else{
                alert("Ошибка получения списка характеристик!");
            }
            $scope.loading = false;
        }, function(err){
            console.log(err);
            alert("Ошибка получения списка характеристик!");
            $scope.loading = false;
        });
        $scope.remove = function(id, index){
            ApiService.charact.remove(id).then(function(response){
                if(response.data != -1){
                    $scope.characts.splice(index, 1);
                }
                else{
                    alert('Не удалось удалить характеристику!');
                }
                console.log(response.data);
            }, function(err){
                console.log(err);
                alert('Не удалось удалить характеристику!');
            });
        }
    }
})();