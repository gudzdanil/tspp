(function(){
    'use strict';

    angular
        .module('gifts')
        .value('API_LINK', '/back/')
        .factory('ApiService', ApiService);

    ApiService.$inject = ['API_LINK', '$http'];

    function ApiService(API_LINK, $http){
        return {
            login: login,
            register: register
        };

        function register(data) {
            delete data.pass2;
            $http.post(API_LINK + 'reg.php', data).then(function(response){
                console.log(response);
            }, function(err){
                console.log(err);
            });
        }
        function login(data) {
            $http.post(API_LINK + 'logIn.php', data).then(function(response){
                console.log(response);
            }, function(err){
                console.log(err);
            });
        }
    }
})();