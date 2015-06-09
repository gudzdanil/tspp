(function(){
    angular
        .module('gifts')
        .controller('LoggerCtrl', LoggerCtrl);

    LoggerCtrl.$inject = ['$scope'];

    function LoggerCtrl($scope){
        $scope.logs = [];

        $scope.remove = remove;
        $scope.$on('log', function(e, data){
            $scope.logs.unshift(data);
        });

        function remove(el){
            $scope.logs.splice(el, 1);
        }
    }
})();