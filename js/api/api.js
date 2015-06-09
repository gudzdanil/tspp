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
            addCharact: addCharact
        };

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
            data.additional = angular.toJson(data.additional);
            return $http.post(API_LINK + 'addCharact.php', data);
        }
    }
})();