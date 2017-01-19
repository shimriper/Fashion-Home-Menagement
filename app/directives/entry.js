
angular.module('chirpApp')
.directive('entry', function() {
    return {
        restrict : 'E',
        replace : true,
        templateUrl : 'login.html',
        controller :'authController' 
        
        }
});