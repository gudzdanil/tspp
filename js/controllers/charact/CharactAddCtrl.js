(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CharactAddCtrl', CharactAddCtrl);

    CharactAddCtrl.$inject = ['$scope', 'CharactService', 'ApiService'];

    function CharactAddCtrl($scope, CharactService, ApiService){
        $scope.charact = {
            type: 'select',
            additional: []
        };
        $scope.addAdditional = function(){$scope.charact.additional.push('');};

        $scope.types = CharactService.types;
        $scope.save = save;

        function save(charact){
            //ApiService.addCharact(charact);
            $scope.charact.additional = angular.toJson($scope.charact.additional);
            CharactService.add(charact);
            alert("Новая характеристика добавлена!");
            $scope.charact = {type: 'select', additional: []};
        }
    }
})();