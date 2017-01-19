
angular.module('mainApp')
.directive('navbar', function() {
    return {
        restrict : 'EA',
       //replace : true,
        templateUrl : 'nav.html',
        controller: 'navController'
    }
});
