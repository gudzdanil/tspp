(function(){
    'use strict';

    angular
        .module('gifts')
        .service('GlobalService', GlobalService);

    GlobalService.$inject = [];

    function GlobalService(){
        this.getRolePresentation = function(role){
            var res;
            switch(role){
                case 'user': res = 'Пользователь';
                    break;
                case 'seller': res = 'Продавец';
                    break;
                case 'admin': res = 'Администратор';
                    break;
            }
            return res;
        };
    }
})();