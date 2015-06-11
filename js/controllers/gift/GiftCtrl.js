(function(){
    'use strict';

    angular
        .module('gifts')
        .controller('GiftCtrl', GiftCtrl);

    GiftCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ApiService', 'AuthData'];

    function GiftCtrl($scope, $stateParams, $timeout, ApiService, AuthData){
        var i, char, gift;
        ApiService.gift.getById($stateParams.id).then(function(response){
            $scope.gift = gift = response[0];
            ApiService.catalog.getAll().then(function(response){
                $scope.catalogs = response;
                updateCharacts($scope.gift.catalog);
            }, function(err){
                console.log(err);
                alert("Ошибка получения списка каталогов!");
            });
            $scope.values = {};
            for(i in gift.values){
                $scope.values[gift.values[i].id_rule] = {
                    charact: gift.values[i].id_rule,
                    val: gift.values[i].value
                };
            }
            $scope.characts = [];
            gift.catalog = gift.catalog.toString();
            $scope.$watch('gift.catalog', updateCharacts);
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

        function prepareGift(){
            var arr = [];
            for(i in $scope.values) {
                arr.push($scope.values[i]);
            }
            $scope.gift.values = arr;
            $scope.gift.id = +$scope.gift.id;
            $scope.gift.user = +AuthData.data.id;
        }

        $scope.save = function(){
            prepareGift();
            ApiService.gift.save($scope.gift).then(function(response){
                alert('Заявка сохранена!');
            }, function(err){
                console.log(err);
                alert("Ошибка сохранения заявки!");
            });
        };
        $scope.confirm = function(){
            if($scope.gift.status == 1){
                alert('Заявка уже подтверждена!');
                return;
            }
            prepareGift();

            ApiService.gift.save($scope.gift).then(function(response){
                $scope.msg = "Сохранена";
                ApiService.gift.create($scope.gift.id).then(function(response){
                    $scope.msg = "Подтверждена";
                    $timeout(function(){$scope.msg = "";}, 5000);
                    ApiService.gift.changeStatus($scope.gift.id, 1).then(function(){
                        $scope.gift.status = 1;
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
            if($scope.gift.status == -1){
                alert('Заявка уже отменена!');
                return;
            }
            prepareGift();

            ApiService.gift.save($scope.gift).then(function(response){
                $scope.msg = "Сохранена";
                if($scope.gift.status == 1) {
                    ApiService.gift.removeByGiftId($scope.gift.id).then(function (response) {

                        ApiService.gift.changeStatus($scope.gift.id, -1).then(function () {
                            $scope.msg = "Отменена";
                            $timeout(function () {
                                $scope.msg = "";
                            }, 5000);
                            $scope.gift.status = -1;
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
                    ApiService.gift.changeStatus($scope.gift.id, -1).then(function () {
                        $scope.msg = "Отменена";
                        $timeout(function () {
                            $scope.msg = "";
                        }, 5000);
                        $scope.gift.status = -1;
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