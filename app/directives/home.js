
angular.module('mainApp')
.directive('homeuser', function() {
    return {
        restrict : 'EA',
       // replace : true,
        templateUrl : 'home.html'
    };
});