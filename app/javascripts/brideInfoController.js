  angular.module('mainApp');
   app.controller('brideInfoController', function($scope , brideService ,$route , $http , $q) {
     init = function(){
          getOneBride();
          // getPayOfBride();
          
     };
    updateBride = function(){
      $http.put('/api/brides/' + $scope.tempid);
      console.log($scope.bride );
    };
      // get() returns a single bride
     getOneBride = function(){
         $scope.tempid = $route.current.params.brideid;
         $scope.bride = brideService.get({id: $scope.tempid});
         console.log($scope.bride );
     };

     $scope.addPayment = function(Payment){
       console.log('-----addPayment-----');
       console.log(Payment);

        $http.post('/api/payments', $scope.newPayment ).then(function(res) {
               console.log(res.data._id);
               $http.put('/api/payments/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                  console.log('this is payment ress');
                    console.log(res);
                    $scope.payid = res.data._id;
                    console.log('this is payment ress end');
                         //  $scope.paymentid = res;
                     console.log('this is getPaymentOfBride @@@@@@@@@@@@@@@@@@@@@@@');
                    //  $scope.tempid = $route.current.params.brideid;
                     $scope.payment = $http.get('/api/brides/'+  $scope.tempid  + '/' + $scope.payid);


                    console.log( ' %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%payment');
                    console.log( $scope.payment);

                 // $scope.pay =  $scope.bride.payment.pay;
                  // $scope.data = [];
                  // $scope.done = [];
                  // for(i=0; i<$scope.payment.lenght; i++){
                  //   console.log( ' payment i' + i);
                  //   $scope.pay = $scope.payment[i].pay ;
                  //   $scope.data = $scope.payment[i].data_pay ;
                  //   $scope.done = $scope.payment[i].done ;
                  // };
              

                  }, function(err) {

                      console.log(err);

                  })

            }, function(err) {

                console.log(err);

            })

     }

    init();
    // setInfoBride();
  });


