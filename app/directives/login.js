
angular.module('mainApp')
.directive('entry', function() {
    return {
        restrict : 'EA',
       //replace : true,
        templateUrl : 'login.html',
        controller: 'authController'
    }
});
