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
        .config(appConfig)
        .run(appRun);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'tplFolderPath', '$httpProvider'];
    
    function appConfig($stateProvider, $urlRouterProvider, tplFolderPath, $httpProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                templateUrl: tplFolderPath + 'main-layout.html'
            })
            .state('main.home', {
                url: '/',
                controller: 'HomeCtrl',
                templateUrl: tplFolderPath + 'home.html'
            })
            .state('main.login', {
                url: '/login',
                templateUrl: tplFolderPath + 'auth.html',
                controller: 'AuthCtrl'
            })
            .state('main.profile', {
                url: '/profile',
                templateUrl: tplFolderPath + 'profile.html',
                controller: 'ProfileCtrl'
            })
            .state('main.seller', {
                url: '/seller',
                templateUrl: tplFolderPath + 'seller.html',
                controller: 'SellerCtrl'
            })
            .state('main.charact', {
                templateUrl: tplFolderPath + 'charact.html'
            })
            .state('main.charact.add', {
                templateUrl: tplFolderPath + 'charact/add.html',
                url: '/characteristic/add',
                controller: 'CharactAddCtrl'
            })
            .state('main.charact.edit', {
                templateUrl: tplFolderPath + 'charact/edit.html',
                url: '/characteristics/edit',
                controller: 'CharactEditCtrl'
            })
            .state('main.charact.editC', {
                templateUrl: tplFolderPath + 'charact/editExact.html',
                url: '/characteristics/edit/:id',
                controller: 'CharactEditExactCtrl'
            })
            .state('main.criterion', {
                templateUrl: tplFolderPath + 'criterion.html'
            })
            .state('main.criterion.add', {
                templateUrl: tplFolderPath + 'criterion/add.html',
                url: '/criterion/add',
                controller: 'CriterionAddCtrl'
            })
            .state('main.criterion.edit', {
                templateUrl: tplFolderPath + 'criterion/edit.html',
                url: '/criterion/edit',
                controller: 'CriterionEditCtrl'
            })
            .state('main.criterion.editC', {
                templateUrl: tplFolderPath + 'criterion/editExact.html',
                url: '/criterion/edit/:id',
                controller: 'CriterionEditExactCtrl'
            })
            .state('main.catalog', {
                templateUrl: tplFolderPath + 'catalog.html'
            })
            .state('main.catalog.add', {
                templateUrl: tplFolderPath + 'catalog/add.html',
                url: '/catalog/add',
                controller: 'CatalogAddCtrl'
            })
            .state('main.catalog.edit', {
                templateUrl: tplFolderPath + 'catalog/edit.html',
                url: '/catalogs/edit',
                controller: 'CatalogEditCtrl'
            })
            .state('main.catalog.editC', {
                templateUrl: tplFolderPath + 'catalog/editExact.html',
                url: '/catalogs/edit/:id',
                controller: 'CatalogEditExactCtrl'
            })
            .state('main.offers', {
                templateUrl: tplFolderPath + '/offer/offers.html',
                url: '/offers',
                controller: 'OfferListCtrl'
            })
            .state('main.offer', {
                templateUrl: tplFolderPath + '/offer/offer.html',
                url: '/offer/:id',
                controller: 'OfferCtrl'
            })
            .state('main.myoffers', {
                templateUrl: tplFolderPath + '/offer/myoffers.html',
                url: '/myoffers',
                controller: 'MyoffersCtrl'
            })
            .state('main.leaveoffer', {
                templateUrl: tplFolderPath + '/offer/addoffer.html',
                url: '/leaveoffer',
                controller: 'LeaveofferCtrl'
            });

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }


    appRun.$inject = ['$rootScope', 'AuthData', '$state', 'ApiService'];
    function appRun($rootScope, AuthData, $state, ApiService){
        ApiService.checkAuth().then(function(){
            checkAuthorization(null, $state.current, null);
            $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState) {
                checkAuthorization(e, toState, fromState);
            });
        });

        function checkAuthorization(e, toState, fromState){
            var isLogin = toState.name === "main.login";

            if (isLogin) {
                return;
            }
            else{
                if(!AuthData.isAuthorized()){
                    if(e)e.preventDefault();
                    $state.go('main.login', {});
                }
            }
        }


        $('img.svg').each(function(){
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
    }
})();