(function(){
    'use strict';

    angular
        .module('gifts')
        .factory('AuthData', AuthData);

    AuthData.$inject = ['$state'];

    function AuthData($state) {
        var data = {};

//        data = getData();

        return {
            data: data,
            setData: setData,
            clearData: clearData,
            isAuthorized: isAuthorized,
            isAuthenticated: isAuthenticated
        };

        function setData(authdata){
            data.login = authdata.login;
            data.email = authdata.email;
            data.id = authdata.id;
            data.lastname = authdata.lastname;
            data.name = authdata.name;
            data.role = roleToString(authdata.roleUser);
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

        function roleToString(id){
            return id == 0 ? 'user' : (id == 1 ? 'seller' : 'admin');
        }

        function getData(){
            return {
                login: 'JustDanny',
                lastname: 'Гудзь',
                name: 'Данил',
                role: 'admin'
            };
        }

    }
})();