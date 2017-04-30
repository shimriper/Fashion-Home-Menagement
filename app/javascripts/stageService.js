
angular.module('mainApp');
app.factory('stageService', function($resource){
  return $resource('/api/stages/:id');
});