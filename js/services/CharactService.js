(function(){
    'use strict';

    angular
        .module('gifts')
        .factory('CharactService', CharactService);

    CharactService.$inject = [];

    function CharactService(){
        var types = {
            select: 'Выпадающий список',
            input: 'Строка',
            text: 'Текстовое поле',
            number: 'Цифра',
            range: 'Диапазон',
            bool: 'Наличие'
        };

        var generated = generate();
        var lastId = 3;

        return {
            types: types,
            precreated: generated,
            add: add,
            save: save,
            getById: getById
        };

        function getById(id){
            var i;
            for(i in generated){
                if(generated[i].id == id){
                    return generated[i];
                }
            }
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
            charact.id = ++lastId;
            generated.push(charact);
        }

        function generate(){
            return [
                {
                    id: 1,
                    name: 'ОС',
                    type: 'select',
                    additional: angular.toJson(['Android', 'iOS', 'Symbian'])
                },
                {
                    id: 2,
                    name: 'Диагональ',
                    type: 'range'
                },
                {
                    id: 3,
                    name: 'Прочее',
                    type: 'text'
                }
            ]
        }
    }
})();