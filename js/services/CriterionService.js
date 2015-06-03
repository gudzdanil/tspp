(function(){
    'use strict';

    angular
        .module('gifts')
        .factory('CriterionService', CriterionService);

    CriterionService.$inject = [];

    function CriterionService(){
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

        function save(criterion){
            var i;
            for(i in generated){
                if(criterion.id == generated[i].id){
                    generated[i] = criterion;
                }
            }
        }

        function add(criterion){
            criterion.id = ++lastId;
            generated.push(criterion);
        }

        function generate(){
            return [
                {
                    id: 1,
                    name: 'ОС',
                    type: 'select',
                    link: 1,
                    additional: angular.toJson(['Android', 'iOS', 'Symbian'])
                },
                {
                    id: 2,
                    link: 2,
                    name: 'Диагональ',
                    type: 'range'
                },
                {
                    id: 3,
                    link: 3,
                    name: 'Прочее',
                    type: 'text'
                }
            ]
        }
    }
})();