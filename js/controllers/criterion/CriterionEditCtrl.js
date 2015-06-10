(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('CriterionEditCtrl', CriterionEditCtrl);

    CriterionEditCtrl.$inject = ['$scope', 'CriterionService', 'ApiService'];

    function CriterionEditCtrl($scope, CriterionService, ApiService){
        ApiService.criterion.getAll().then(function(response){
            $scope.criterions = response;
        }, function(err){
            alert("Не удалось получить список критериев поиска!");
            console.log(err);
        });

        $scope.remove = function(id, index){
            ApiService.criterion.remove(id).then(function(response){
                $scope.criterions.splice(index, 1);
            }, function(err){
                console.log(err);
                alert('Не удалось удалить критерий поиска!');
            });
        }
    }
})();