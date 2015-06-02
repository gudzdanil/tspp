(function(){
    'use strict';

    angular
        .module('gifts')
        .factory('AuthData', AuthData);

    AuthData.$inject = ['$state'];

    function AuthData($state) {
        var data = {};

        data = getData();

        return {
            data: data,
            setData: setData,
            clearData: clearData,
            isAuthorized: isAuthorized,
            isAuthenticated: isAuthenticated
        };

        function setData(authdata){
            data.login = authdata.login;
            data.surname = authdata.surname;
            data.name = authdata.name;
            data.role = authdata.role;
        }
        function clearData(){
            angular.forEach(data, function(el, key){
                data[key] = null;
            });
            $state.go('main.login', {});
        }
        function isAuthorized(){
            return !!data.role;
        }
        function isAuthenticated(role){
            return role == data.role;
        }

        function getData(){
            return {
                login: 'JustDanny',
                surname: 'Гудзь',
                name: 'Данил',
                role: 'admin'
            };
        }

    }
})();