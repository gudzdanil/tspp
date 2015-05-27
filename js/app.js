(function(){
    'use strict';

    angular
        .module('gifts', ['ui.bootstrap', 'ui.router'])
        .constant('tplFolderPath', 'partials/')
        .constant('ROLES', {
            0: 'Пользователь',
            1: 'Продавец',
            2: 'Администратор'
        })
        .config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'tplFolderPath'];
    
    function appConfig($stateProvider, $urlRouterProvider, tplFolderPath){
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('auth', {
                url: '/',
                templateUrl: tplFolderPath + 'auth.html',
                controller: 'AuthCtrl'
            });
    }
})();