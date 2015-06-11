(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('MyofferCtrl', MyofferCtrl);

    MyofferCtrl.$inject = ['$scope', '$stateParams', 'AuthData', 'ApiService'];

    function MyofferCtrl($scope, $stateParams, AuthData, ApiService){
        var i, val, char, offer;
        ApiService.offer.getById($stateParams.id).then(function(response){
            $scope.offer = offer = response[0];
            ApiService.catalog.getAll().then(function(response){
                $scope.catalogs = response;
                updateCharacts($scope.offer.catalog);
            }, function(err){
                console.log(err);
                alert("Ошибка получения списка каталогов!");
            });
            $scope.values = {};
            for(i in offer.values){
                $scope.values[offer.values[i].id_rule] = {
                    charact: offer.values[i].id_rule,
                    val: offer.values[i].value
                };
            }
            $scope.characts = [];
            offer.catalog = offer.catalog.toString();
            $scope.$watch('offer.catalog', updateCharacts);
            function updateCharacts(newVal, oldVal){
                $scope.characts = [];
                if(oldVal && oldVal != newVal){
                    $scope.values = {};
                }
                if($scope.catalogs) {
                    var cat = $scope.catalogs.filter(function (el) {
                        return el.id == newVal;
                    })[0];
                    for (i in cat.characts) {
                        ApiService.charact.getById(cat.characts[i]).then(function (response) {
                            if (response.data != -1 && response.data[0]) {
                                char = response.data[0];
                                $scope.characts.push(char);
                                if(!$scope.values[char.id]) {
                                    $scope.values[char.id] = {
                                        charact: char.id,
                                        val: null
                                    };
                                }
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

        }, function(err){
            alert("Ошибка получения данных заявки!");
            console.log(err);
        });


        $scope.save = function(){
            var arr = [];
            for(i in $scope.values) {
                arr.push($scope.values[i]);
            }
            $scope.offer.values = arr;
            $scope.offer.id = +$scope.offer.id;
            $scope.offer.user = +AuthData.data.id;
            ApiService.offer.save($scope.offer).then(function(response){
                alert('Заявка сохранена!');
            }, function(err){
                console.log(err);
                alert("Ошибка сохранения заявки!");
            });
        };
    }
})();