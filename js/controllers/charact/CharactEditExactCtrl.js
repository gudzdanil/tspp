(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CharactEditExactCtrl', CharactEditExactCtrl);

    CharactEditExactCtrl.$inject = ['$scope', '$stateParams', 'ApiService', 'CharactService'];

    function CharactEditExactCtrl($scope, $stateParams, ApiService, CharactService){
        $scope.loading = true;
        $scope.types = CharactService.types;
        ApiService.charact.getById($stateParams.id).then(function(response){
            if(response.data != -1 && response.data[0]){
                $scope.charact = response.data[0];
                if($scope.charact.additional){
                    $scope.charact.additional = angular.fromJson($scope.charact.additional);
                }
            }
            else{
                alert('Ошибка получения данных характеристики!');
            }
            $scope.loading = false;
        }, function(err){
            console.log(err);
            alert('Не удалось получить данные по характеристике');
            $scope.loading = false;
        });
        $scope.addAdditional = function(){
            $scope.charact.additional = $scope.charact.additional || [];
            $scope.charact.additional.push('');
        };
        $scope.save = save;
        function save(charact){
            charact = angular.copy(charact);
            charact.additional = angular.toJson(charact.additional);
            ApiService.charact.save(charact).then(function(response){
                alert("Характеристика сохранена!");
                console.log(response);
            });
        }
    }
})();