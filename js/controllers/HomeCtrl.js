(function(){
    'use strict';

    angular
        .module('gifts')
        .filter('criterion', function(){return criterionFilter})
        .filter('price', function(){
            return function(arr, price){
                if(!price || !arr || !arr.length || (!angular.isNumber(price[0]) && !angular.isNumber(price[1]))){
                    return arr;
                }
                return arr.filter(function(a){
                    return +a.price >= +price[0] && (!angular.isNumber(price[1]) || +a.price <= +price[1]);
                });
            };
        })
        .filter('brand', function(){
            return function(arr, brand){
                if(!brand || !arr || !arr.length){
                    return arr;
                }
                return arr.filter(function(a){return a.brand.toLowerCase().indexOf(brand.toLowerCase()) > -1;});
            };
        })
        .filter('catalog', function(){
            return function(arr, catalog){
                return angular.isUndefined(catalog)
                    ? arr
                    : arr.filter(function(a){return +a.catalog == +catalog;
                });
            };
        })
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', 'ApiService'];

    function HomeCtrl($scope, ApiService){
        var i, crit, j;
        $scope.values = {};
        $scope.catalogNames = {};
        $scope.price = {type: {type: 'range', name: 'Цена'}, value: {criterion: 1, val: []}};
        $scope.brand = {type: {type: 'input', name: 'Бренд'}, value: {criterion: 2, val: ''}};
        ApiService.catalog.getAll().then(function(promise){
            $scope.catalogs = promise;
            for(j in promise){
                $scope.catalogNames[promise[j].id] = promise[j].name;
            }
        }, function(err){
            alert("Не удалось получить список каталогов!");
            console.log(err);
        });

        $scope.$watch('catalog', updateCharacts);
        function updateCharacts(newVal, oldVal){
            $scope.criterions = [];
            if(oldVal && oldVal != newVal){
                $scope.values = {};
            }
            if($scope.catalogs) {
                var cat = $scope.catalogs.filter(function (el) {
                    return el.id == newVal;
                })[0];
                for (i in cat.characts) {
                    ApiService.criterion.getByCharactId(cat.characts[i]).then(function (response) {
                        if(response && response[0]) {
                            crit = response[0];
                            $scope.criterions.push(crit);
                            $scope.values[crit.id_categorie] = {
                                charact: crit.id_rule,
                                val: null
                            };
                        }
                    }, function (err) {
                        console.log(err);
                        alert("Ошибка получения критерия поиска!");
                    });
                }
            }
        }

        ApiService.gift.getAll().then(function(response){
            $scope.giftList = $scope.gifts = response;
        }, function(err){
            console.log(err);
            alert("Ошибка получения списка подарков!");
        });
        $scope.search = function(text){
            $scope.gifts = $scope.giftList.filter(function(el){
                return el.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
        }
    }

    function criterionFilter(arr, criterions, values){
        if(!arr || !arr.length)return arr;
        var res, i, crit, char, hasVals;
        for(i in values){
            hasVals = true;
            break;
        }
        if(!hasVals) return arr;

        return !arr.length ? [] : arr.filter(function(a){
            for(i in values){
                hasVals = true;
                if(values[i].val){
                    crit = criterions.filter(function(b){return b.id_rule == values[i].charact;})[0];
                    char = a.values.filter(function(b){return b.id_rule == values[i].charact;})[0];
                    switch(crit.type){
                        case 'number':
                        case 'select':
                        case 'bool':
                            res = char.value == values[i].val;
                            break;
                        case 'input':
                        case 'text':
                            res = char.value.indexOf(values[i].val) > -1;
                            break;
                        case 'range':
                            res = (values[i].val instanceof Array
                                ? (+char.value[0] < +values[i].val[0] && +char.value[1] > +values[i].val[1])
                                : (+char.value[0] < +values[i].val && +char.value[1] > +values[i].val));
                            break;
                    }
                }
            }
            return res;
        });
    }
})();