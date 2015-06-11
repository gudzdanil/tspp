(function(){
    angular
        .module('gifts')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', 'AuthData', 'GlobalService', 'ApiService'];

    function ProfileCtrl($scope, AuthData, GlobalService, ApiService){
        $scope.data = AuthData.data;
        $scope.roleToString = GlobalService.getRolePresentation;
        if($scope.data.role =='seller'){
            ApiService.offer.getCountById($scope.data.id).then(function(response){
                $scope.offers = response;
            }, function(err){
                alert("Не удалось получить кол-во оставленных заявок!");
                console.log(err);
            });
        }
    }
})();