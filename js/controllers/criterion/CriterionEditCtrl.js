(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CriterionEditCtrl', CriterionEditCtrl);

    CriterionEditCtrl.$inject = ['$scope', 'CriterionService'];

    function CriterionEditCtrl($scope, CriterionService){
        $scope.criterions = CriterionService.precreated;
    }
})();