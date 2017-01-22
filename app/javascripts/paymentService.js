
angular.module('mainApp');
app.factory('paymentService', function($resource){
  return $resource('/api/payments/:id');
});