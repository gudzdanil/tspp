(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CriterionEditExactCtrl', CriterionEditExactCtrl);

    CriterionEditExactCtrl.$inject = ['$scope', 'ApiService', 'CharactService',  '$stateParams'];

    function CriterionEditExactCtrl($scope, ApiService, CharactService, $stateParams){
        $scope.loading = true;
        $scope.copyCharact = copyCharact;
        $scope.save = save;

        $scope.types = CharactService.types;

        ApiService.criterion.getById($stateParams.id).then(function(response){
            $scope.criterion = response[0];
            if($scope.criterion.additional){
                $scope.criterion.additional = angular.fromJson($scope.criterion.additional);
            }
            $scope.loading = false;
        }, function(err){
            console.log(err);
            alert('Не удалось получить данные по критерию поиска');
            $scope.loading = false;
        });

        ApiService.charact.getAll().then(function(response){
            $scope.characts = response;
        }, function(err){
            console.log(err);
            alert('Не удалось получить данные по характеристике');
        });
        if($scope.criterion && $scope.criterion.additional){
            $scope.criterion.additional = angular.fromJson($scope.criterion.additional);
        }
        $scope.addAdditional = function(){
            $scope.criterion.additional = $scope.criterion.additional || [];
            $scope.criterion.additional.push('');
        };

        function save(criterion){
            var res = {
                id : criterion.id_categorie,
                name: criterion.name,
                type: criterion.type,
                additional: angular.toJson(criterion.additional)
            }
            ApiService.criterion.save(res).then(function(response){
                alert("Критерий поиска сохранен!");
            }, function(err){
                alert("Ошибка сохранения критерия поиска");
                console.log(err);
            });
        }
        function copyCharact(){
            var charact = charactById($scope.criterion.link);
            $scope.criterion.name = charact.name;
            $scope.criterion.type = charact.type;
            $scope.criterion.additional = angular.fromJson(charact.additional);
        }
        function charactById(id){
            var i;
            for(i in $scope.characts){
                if($scope.characts[i].id == id){
                    return angular.copy($scope.characts[i]);
                }
            }
        }
    }
})();