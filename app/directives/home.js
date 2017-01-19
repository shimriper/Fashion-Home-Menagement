
angular.module('chirpApp')
.directive('home', function() {
    return {
        restrict : 'E',
        replace : true,
        templateUrl : 'home.html',
        // controller : function ($scope, $rootScope, $state) {
        //     $scope.switchState = function(state) {
        //         $state.go(state);
        //     }
        // }
    };
});