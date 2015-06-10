(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('LeaveofferCtrl', LeaveofferCtrl);

    LeaveofferCtrl.$inject = ['$scope', 'OffersService', 'CharactService', '$rootScope', 'ApiService'];

    function LeaveofferCtrl($scope, OffersService, CharactService, $rootScope, ApiService){
        var i, val, char;
        var offer = {
            name: '',
            price: null,
            img: '',
            url: '',
            catalog: null,
            values: [],
            additional: ''
        };

        $scope.values = {};
        $scope.characts = [];
        $scope.offer = offer;
        $scope.save = save;

        ApiService.catalog.getAll().then(function(response){
            $scope.catalogs = response;
//            updateCharacts($scope.offer.catalog);
        }, function(err){
            console.log(err);
            alert("Ошибка получения списка каталогов!");
        });
        $scope.$watch('offer.catalog', updateCharacts);
        function updateCharacts(newVal){
            $scope.characts = [];
            $scope.values = {};
            if($scope.catalogs) {
                var cat = $scope.catalogs.filter(function (el) {
                    return el.id == newVal;
                })[0];
                for (i in cat.characts) {
                    ApiService.charact.getById(cat.characts[i]).then(function (response) {
                        if (response.data != -1 && response.data[0]) {
                            char = response.data[0];
                            $scope.characts.push(char);
                            $scope.values[char.id] = {
                                charact: char.id,
                                val: null
                            };
                        }
                        else {
                            alert("Ошибка получения характеристик!");
                        }
                    }, function (err) {
                        console.log(err);
                        alert("Ошибка получения характеристик!");
                    });
                }
            }
        }
        function save(){
            console.log($scope.offer, $scope.values);
            $scope.offer.values = [];
            for(i in $scope.values){
                $scope.offer.values.push($scope.values[i]);
            }
            OffersService.add($scope.offer);
        }
    }
})();