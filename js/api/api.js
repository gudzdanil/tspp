(function(){
    'use strict';

    angular
        .module('gifts')
        .value('API_LINK', 'back/')
        .factory('ApiService', ApiService);

    ApiService.$inject = ['API_LINK', '$http', 'AuthData', 'AjaxService'];

    function ApiService(API_LINK, $http, AuthData, AjaxService){
        return {
            login: login,
            register: register,
            logout: logout,
            checkAuth: checkAuth,
            charact:{
                getAll: getCharacts,
                getById: getCharact,
                add: addCharact,
                save: saveCharact,
                remove: removeCharact
            },
            catalog: {
                add: addCatalog,
                getAll: getCatalogs,
                remove: removeCatalog,
                getById: getCatalog,
                save: saveCatalog
            },
            criterion: {
                getAll: getCriterions,
                getById: getCriterion,
                add: addCriterion,
                save: saveCriterion,
                remove: removeCriterion
            }
        };

        function getCriterions(){
            return AjaxService.post('categories/getAllCategories');
        }

        function getCriterion(id){
            return AjaxService.post('categories/getCategorieById', {id: +id});
        }

        function addCriterion(crit){
            return AjaxService.post('categories/addCategorie', crit);
        }

        function saveCriterion(crit){
            return AjaxService.post('categories/editCategorie', crit);
        }

        function removeCriterion(id){
            return AjaxService.post('categories/deleteCategorie', {id: +id});
        }

        function saveCatalog(catalog){
            return AjaxService.post('catalogs/editCatalog', catalog);
        }

        function getCatalog(id){
            return AjaxService.post('catalogs/getCatalogById', {id: id});
        }

        function removeCatalog(id){
            return AjaxService.post('catalogs/deleteCatalog', {id: id});
        }

        function getCatalogs(){
            return AjaxService.post('catalogs/getAllCatalogs');
        }

        function addCatalog(data){
            return AjaxService.post('catalogs/addCatalog', data);
        }

        function removeCharact(id){
            return $http.post(API_LINK + 'rules/deleteRule.php', {id: id});
        }

        function saveCharact(charact){
            return $http.post(API_LINK + 'rules/editRule.php', charact);
        }

        function getCharact(id){
            return $http.post(API_LINK + 'rules/getRuleById.php', {id: +id});
        }

        function getCharacts(){
            return AjaxService.post('rules/getAllRules');
        }

        function checkAuth(){
            return $http.get(API_LINK + 'session.php').then(function(response){
                if(response.data != -1){
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
                if(response != -1){
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
                if(response.data != -1){
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