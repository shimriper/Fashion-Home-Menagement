  
  angular.module('mainApp');
  app.controller('paymentController', function($rootScope ,$scope , paymentService, $http, $location) {

    $scope.payment = function(){
      $scope.newPayment;
      paymentService.save($scope.newPayment, function(){
            $scope.payments = paymentService.query();
            $scope.newPayment = {
                	pay:'',
                    date_pay:'',
                    done:'',
            };
      });
    };
  });