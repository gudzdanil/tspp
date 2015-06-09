(function(){
    'use strict';

    angular
        .module('gifts')
        .factory('CatalogService', CatalogService);

    CatalogService.$inject = [];

    function CatalogService(){

        var generated = generate();

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
            generated.push(catalog);
            catalog.id = generated.length;
        }

        function generate(){
            return [
                {
                    id: 1,
                    name: 'Мебель',
                    characts: [1]
                },
                {
                    id: 2,
                    name: 'Телефоны',
                    characts: [1,2]
                },
                {
                    id: 3,
                    name: 'Мониторы',
                    characts: [1,3]
                }
            ]
        }
    }
})();