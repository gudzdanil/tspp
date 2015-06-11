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
                remove: removeCriterion,
                getByCharactId: getCriterionByCharactId
            },
            offer: {
                getByUser: getOffersByUser,
                getById: getOffer,
                getAll: getOffers,
                add: addOffer,
                save: saveOffer,
                remove: removeOffer,
                getCountById: getOfferCountById,
                changeStatus: changeOfferStatus,
                getCount: getOffersCount
            },
            gift: {
                create: createGift,
                removeByOfferId: removeGiftByOfferId,
                getAll: getAllGifts,
                getById: getGiftById
            }
        };

        function getGiftById(id){
            return AjaxService.post('gifts/getGiftById', {id: id});
        }

        function getAllGifts(){
            return AjaxService.post('gifts/getAllGifts');
        }

        function getCriterionByCharactId(id){
            return AjaxService.post('categories/getByCharactId', {id_rule: id});
        }

        function createGift(idOffer){
            return AjaxService.post('gifts/addGift', {offer_id: idOffer});
        }

        function removeGiftByOfferId(idOffer){
            return AjaxService.post('gifts/deleteGiftByOfferId', {offer_id: idOffer});
        }

        function getOffersCount(){
            return AjaxService.post('offers/getCount');
        }

        function getOffers(){
            return AjaxService.post('offers/getOffers');
        }

        function changeOfferStatus(id, status){
            return AjaxService.post('offers/setStatus', {id: id, status: status});
        }

        function getOfferCountById(id){
            return AjaxService.post('offers/getCountById', {id: id});
        }

        function addOffer(offer){
            return AjaxService.post('offers/addOffer', offer);
        }

        function saveOffer(offer){
            return AjaxService.post('offers/editOffer', offer);
        }

        function removeOffer(id){
            return AjaxService.post('offers/deleteOffer', {id: +id});
        }

        function getOffer(id){
            return AjaxService.post('offers/getOfferById', {id: +id});
        }

        function getOffersByUser(id){
            return AjaxService.post('offers/getOffersByUserId', {user_id : +id});
        }

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
            $http.get(API_LINK + 'logOut.php').then(function(){
                AuthData.clearData();
            });

        }

        function addCharact(data){
            return $http.post(API_LINK + 'rules/addRule.php', data);
        }
    }
})();