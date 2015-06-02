(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CharactEditExactCtrl', CharactEditExactCtrl);

    CharactEditExactCtrl.$inject = ['$scope', 'CharactService', '$stateParams'];

    function CharactEditExactCtrl($scope, CharactService, $stateParams){
        $scope.charact = angular.copy(CharactService.getById($stateParams.id));
        if($scope.charact && $scope.charact.additional){
            $scope.charact.additional = angular.fromJson($scope.charact.additional);
        }
        $scope.save = save;
        $scope.types = CharactService.types;

        function save(){
            $scope.charact.additional = angular.toJson($scope.charact.additional);
            CharactService.save($scope.charact);
            alert("Характеристика сохранена!");
        }
    }
})();