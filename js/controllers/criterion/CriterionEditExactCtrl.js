(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CriterionEditExactCtrl', CriterionEditExactCtrl);

    CriterionEditExactCtrl.$inject = ['$scope', 'CriterionService', 'CharactService',  '$stateParams'];

    function CriterionEditExactCtrl($scope, CriterionService, CharactService, $stateParams){
        $scope.criterion = angular.copy(CriterionService.getById($stateParams.id));
        $scope.characts = CharactService.precreated;
        $scope.copyCharact = copyCharact;

        if($scope.criterion && $scope.criterion.additional){
            $scope.criterion.additional = angular.fromJson($scope.criterion.additional);
        }
        $scope.addAdditional = function(){
            $scope.criterion.additional = $scope.criterion.additional || [];
            $scope.criterion.additional.push('');
        };
        $scope.save = save;
        $scope.types = CriterionService.types;

        function save(){
            var temp = $scope.criterion.additional;
            $scope.criterion.additional = angular.toJson($scope.criterion.additional);
            CriterionService.save($scope.criterion);
            alert("Характеристика сохранена!");
            $scope.criterion.additional = temp;
        }
        function copyCharact(){
            var charact = CharactService.getById($scope.criterion.link);
            $scope.criterion.name = charact.name;
            $scope.criterion.type = charact.type;
            $scope.criterion.additional = angular.fromJson(charact.additional);
        }
    }
})();