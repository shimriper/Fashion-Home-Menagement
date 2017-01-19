
angular.module('mainApp');
app.factory('brideService', function($resource){
  return $resource('/api/brides/:id');
});