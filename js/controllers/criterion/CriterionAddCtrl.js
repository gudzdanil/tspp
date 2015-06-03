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
        $scope.characts = CharactService.precreated;
        $scope.copyCharact = copyCharact;

        function save(criterion){
            //ApiService.addCriterion(criterion);
            $scope.criterion.additional = angular.toJson($scope.criterion.additional);
            CriterionService.add(criterion);
            alert("Новый критерий поиска добавлен!");
            $scope.criterion = {type: 'select', additional: []};
        }

        function copyCharact(){
            var charact = CharactService.getById($scope.criterion.link);
            $scope.criterion.name = charact.name;
            $scope.criterion.type = charact.type;
            $scope.criterion.additional = angular.fromJson(charact.additional);
        }
    }
})();