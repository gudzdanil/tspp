(function(){
    'use strict';

    angular
        .module('gifts')
        .value('API_LINK', 'back/')
        .factory('ApiService', ApiService);

    ApiService.$inject = ['API_LINK', '$http', 'AuthData'];

    function ApiService(API_LINK, $http, AuthData){
        return {
            login: login,
            register: register,
            logout: logout,
            checkAuth: checkAuth,
            charact:{
                getAll: getCharacts,
                getById: getCharact,
                add: addCharact
            }
        };

        function getCharact(id){
            return $http.post(API_LINK + 'rules/getRuleById.php', {id: +id});
        }

        function getCharacts(){
            return $http.get(API_LINK + 'rules/getAllRules.php');
        }

        function checkAuth(){
            return $http.get(API_LINK + 'session.php').then(function(response){
                if(response.data !== -1){
                    AuthData.setData(response.data);
                }
            }, function(err){
                console.log(err);
            });
        }

        function register(data) {
            data = angular.copy(data);
            delete data.pass2;
            return $http.post(API_LINK + 'reg.php', data).then(function(response){
                if(response == 1){
                    alert("Вы успешно зарегистрировались")
                }
                else{
                    alert("Ошибка регистрации");
                }
            }, function(err){
                console.log(err);
            });
        }
        function login(data) {
            return $http.post(API_LINK + 'logIn.php', data).then(function(response){
                if(response.data !== -1){
                    AuthData.setData(response.data);
                }
                else{
                    alert('Логин или пароль введены неверно!');
                }
            }, function(err){
                console.log(err);
                alert('Ошибка авторизации');
            });
        }
        function logout(){
            AuthData.clearData();
        }

        function addCharact(data){
            return $http.post(API_LINK + 'rules/addRule.php', data);
        }
    }
})();