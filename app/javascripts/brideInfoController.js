  angular.module('mainApp');
   app.controller('brideInfoController', function($scope , brideService ,$route) {    
     init = function(){
       getOneBride();
      //  setInfoBride();
     };
      // get() returns a single bride
     getOneBride = function(){ 
         $scope.tempid = $route.current.params.brideid;
         $scope.bride = brideService.get({id: $scope.tempid});
         console.log($scope.bride ); 
     };
    init();
    // setInfoBride();
  });


app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

app.controller('editeBrideInfo', function($scope, brideService , $route) {
  initBride = function(){
    $scope.bride;
    
  };
  
  initBride();
  // $scope.tempid = $route.current.params.brideid;
  // $scope.bride = brideService.save({id: $scope.tempid});

  console.log($scope.bride); 
});

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
 