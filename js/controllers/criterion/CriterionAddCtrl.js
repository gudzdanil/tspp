(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CriterionAddCtrl', CriterionAddCtrl);

    CriterionAddCtrl.$inject = ['$scope', 'CriterionService', 'ApiService', 'CharactService'];

    function CriterionAddCtrl($scope, CriterionService, ApiService, CharactService){
        $scope.criterion = {
            type: 'select',
            additional: []
        };
        $scope.addAdditional = function(){$scope.criterion.additional.push('');};
        $scope.types = CriterionService.types;
        $scope.save = save;
        ApiService.charact.getAll().then(function(response){
            $scope.characts = response;
        }, function(err){
            alert("Не удалось получить список характеристик!");
            console.log(err);
        });
        $scope.copyCharact = copyCharact;

        function save(criterion){
            //ApiService.addCriterion(criterion);
            $scope.criterion.additional = angular.toJson($scope.criterion.additional);
            ApiService.criterion.add(criterion).then(function(response){
                $scope.criterion.additional = angular.fromJson($scope.criterion.additional);
                alert("Новый критерий поиска добавлен!");
                $scope.criterion = {type: 'select', additional: []};
            }, function(err){
                $scope.criterion.additional = angular.fromJson($scope.criterion.additional);
                alert("Ошибка добавления новой характеристики");
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