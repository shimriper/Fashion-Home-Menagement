
angular.module('mainApp');
app.factory('postService', function($resource){
  return $resource('/api/posts/:id');
});