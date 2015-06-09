(function(){
    'use strict';

    angular
        .module('gifts')
        .factory('ValuesService', ValuesService);

    ValuesService.$inject = ['CharactService'];

    function ValuesService(CharactService){
        var generated = generate();
        return {
            precreated: generated,
            getById: getById,
            remove: remove,
            getNameVal: getNameVal
        };

        function generate(){
            return [
                {
                    id: 1,
                    charact: 1,
                    val: 'Android'
                },
                {
                    id: 2,
                    charact: 2,
                    val: 4.8
                },
                {
                    id: 3,
                    charact: 3,
                    val: 58
                }
            ];
        }

        function getNameVal(id){
            var obj = getById(id);
            return {
                name: CharactService.getById(obj.charact).name,
                val: obj.val
            };
        }

        function remove(id){
            generated.splice(generated.indexOf(getById(id)), 1);
        }

        function getById(id){
            var i;
            for(i = 0 ; i < generated.length; i++){
                if(generated[i].id == id){
                    return generated[i];
                }
            }
        }
    }
})();