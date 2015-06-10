(function(){
    'use strict';

    angular
        .module('gifts')
        .factory('OffersService', OffersService);

    OffersService.$inject = ['ValuesService'];

    function OffersService(ValuesService){

        var generated = generate();

        return {
            precreated: generated,
            add: add,
            save: save,
            getById: getById,
            remove: remove
        };

        function getById(id){
            var i;
            for(i in generated){
                if(generated[i].id == id){
                    return generated[i];
                }
            }
        }

        function remove(id){
            var i;
            var obj = getById(id);
            var ind = generated.indexOf(obj);
            for(i in obj.values){
                ValuesService.remove(obj.values[i]);
            }
            generated.splice(ind, 1);
        }

        function save(charact){
            var i;
            for(i in generated){
                if(charact.id == generated[i].id){
                    generated[i] = charact;
                }
            }
        }

        function add(charact){
            generated.push(charact);
            charact.id = generated.length;
        }

        function generate(){
            return [
                {
                    id: 1,
                    name: 'Samsung galaxy s4',
                    brand: 'Samsung',
                    img: 'http://cdn.theunlockr.com/wp-content/uploads/2014/09/Unlock-the-Samsung-Galaxy-S4.jpg',
                    price: 5000,
                    catalog: 2,
                    values: [
                        1, 2
                    ],
                    status: 0,
                    additional: "Процессор: 1ГГц, тип экрана: сенсорный"
                },
                {
                    id: 2,
                    name: 'LG smart tv',
                    brand: 'LG',
                    img: 'http://brain.com.ua/static/images/articles_icons/239.jpg',
                    price: 12000,
                    catalog: 6,
                    values: [
                        3
                    ],
                    status: 1,
                    additional: "Цвет: черный, порт: HDMI"
                }
            ]
        }
    }
})();