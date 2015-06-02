(function(){
    'use strict';

    angular
        .module('gifts')
        .factory('CatalogService', CatalogService);

    CatalogService.$inject = [];

    function CatalogService(){

        var generated = generate();
        var lastId = 3;

        return {
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

        function save(catalog){
            var i;
            for(i in generated){
                if(catalog.id == generated[i].id){
                    generated[i] = catalog;
                }
            }
        }

        function add(catalog){
            catalog.id = ++lastId;
            generated.push(catalog);
        }

        function generate(){
            return [
                {
                    id: 1,
                    name: 'Мебель',
                    characts: {1: 1}
                },
                {
                    id: 2,
                    name: 'Телефоны',
                    characts: {2: 1,3: 1}
                },
                {
                    id: 3,
                    name: 'Мониторы',
                    characts: {1: 1,3: 1}
                }
            ]
        }
    }
})();