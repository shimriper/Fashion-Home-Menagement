
angular.module('mainApp');
app.factory('sizeService', function($resource){  
    return $resource('/api/sizes/:id');
});