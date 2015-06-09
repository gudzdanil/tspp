(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CharactEditExactCtrl', CharactEditExactCtrl);

    CharactEditExactCtrl.$inject = ['$scope', '$stateParams', 'ApiService'];

    function CharactEditExactCtrl($scope, $stateParams, ApiService){
        ApiService.charact.getById($stateParams.id).then(function(response){
            console.log(response.data);
        }, function(err){
            console.log(err);
            alert('Не удалось получить данные по характеристике');
        });
//
//        $scope.charact = angular.copy(CharactService.getById());
//        if($scope.charact && $scope.charact.additional){
//            $scope.charact.additional = angular.fromJson($scope.charact.additional);
//        }
//        $scope.addAdditional = function(){
//            $scope.charact.additional = $scope.charact.additional || [];
//            $scope.charact.additional.push('');
//        };
//        $scope.save = save;
//        $scope.types = CharactService.types;
//
//        function save(){
//            var temp = $scope.charact.additional;
//            $scope.charact.additional = angular.toJson($scope.charact.additional);
//            CharactService.save($scope.charact);
//            alert("Характеристика сохранена!");
//            $scope.charact.additional = temp;
//        }
    }
})();