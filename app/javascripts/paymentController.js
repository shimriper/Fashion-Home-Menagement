app.controller('paymentController', function($rootScope ,$scope , paymentService,brideService, $http, $location , $route) {
    $scope.payment = function(){
      console.log($route.current.params.brideid); 
      $scope.newPayment.bride = $route.current.params.brideid;
      console.log($scope.newPayment.bride); 
      paymentService.save($scope.newPayment, function(){
            $scope.payments = paymentService.query();
            $scope.newPayment = {
                    bride:'',
                    total_price:'',
                	  pay:'',
                    date_pay:'',
                    done:''
            };
      });
    };
  });