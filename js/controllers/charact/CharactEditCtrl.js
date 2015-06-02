(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CharactEditCtrl', CharactEditCtrl);

    CharactEditCtrl.$inject = ['$scope', 'CharactService'];

    function CharactEditCtrl($scope, CharactService){
        $scope.characts = CharactService.precreated;
    }
})();