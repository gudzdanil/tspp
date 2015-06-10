(function(){
    angular.module('gifts')
        .service('AjaxService', function($http, API_LINK, $q){

            this.post = function(url, data){
                var deferred = $q.defer();
                $http.post(API_LINK + url + '.php', data).then(function(response){
                    if(response.data != -1){
                        deferred.resolve(response.data);
                    }
                    else{
                        deferred.reject(-1);
                    }
                }, function(err){
                    deferred.reject(err);
                });
                return deferred.promise;
            }
        });
})();