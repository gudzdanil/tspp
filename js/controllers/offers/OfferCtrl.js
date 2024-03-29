(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('OfferCtrl', OfferCtrl);

    OfferCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ApiService', 'AuthData'];

    function OfferCtrl($scope, $stateParams, $timeout, ApiService, AuthData){
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

        function prepareOffer(){
            var arr = [];
            for(i in $scope.values) {
                arr.push($scope.values[i]);
            }
            $scope.offer.values = arr;
            $scope.offer.id = +$scope.offer.id;
            $scope.offer.user = +AuthData.data.id;
        }

        $scope.save = function(){
            prepareOffer();
            ApiService.offer.save($scope.offer).then(function(response){
                alert('Заявка сохранена!');
            }, function(err){
                console.log(err);
                alert("Ошибка сохранения заявки!");
            });
        };
        $scope.confirm = function(){
            if($scope.offer.status == 1){
                alert('Заявка уже подтверждена!');
                return;
            }
            prepareOffer();

            ApiService.offer.save($scope.offer).then(function(response){
                $scope.msg = "Сохранена";
                ApiService.gift.create($scope.offer.id).then(function(response){
                    $scope.msg = "Подтверждена";
                    $timeout(function(){$scope.msg = "";}, 5000);
                    ApiService.offer.changeStatus($scope.offer.id, 1).then(function(){
                        $scope.offer.status = 1;
                    }, function(err){
                        console.log(err);
                        alert("Ошибка изменения статуса заявки!");
                    });
                }, function(err){
                    console.log(err);
                    alert("Ошибка подтверждения заявки!");
                });
            }, function(err){
                console.log(err);
                alert("Ошибка сохранения заявки!");
            });
        };

        $scope.cancel = function(){
            if($scope.offer.status == -1){
                alert('Заявка уже отменена!');
                return;
            }
            prepareOffer();

            ApiService.offer.save($scope.offer).then(function(response){
                $scope.msg = "Сохранена";
                if($scope.offer.status == 1) {
                    ApiService.gift.removeByOfferId($scope.offer.id).then(function (response) {

                        ApiService.offer.changeStatus($scope.offer.id, -1).then(function () {
                            $scope.msg = "Отменена";
                            $timeout(function () {
                                $scope.msg = "";
                            }, 5000);
                            $scope.offer.status = -1;
                        }, function (err) {
                            console.log(err);
                            alert("Ошибка отмены заявки!");
                        });
                    }, function (err) {
                        console.log(err);
                        alert("Не удалось удалить подарок привязанный к заявке!");
                    });
                }
                else{
                    ApiService.offer.changeStatus($scope.offer.id, -1).then(function () {
                        $scope.msg = "Отменена";
                        $timeout(function () {
                            $scope.msg = "";
                        }, 5000);
                        $scope.offer.status = -1;
                    }, function (err) {
                        console.log(err);
                        alert("Ошибка отмены заявки!");
                    });
                }
            }, function(err){
                console.log(err);
                alert("Ошибка сохранения заявки!");
            });
        };
    }
})();