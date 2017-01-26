  angular.module('mainApp');
   app.controller('brideInfoController', function($scope , brideService ,$route , $http , $q) {
     init = function(){
          getOneBride();
          // getPayOfBride();
          
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
                  console.log('this is payment');
                    console.log(res);
                         //  $scope.paymentid = res;
                     console.log('this is getPaymentOfBride @@@@@@@@@@@@@@@@@@@@@@@');
                  $scope.tempid = $route.current.params.brideid;
                  $scope.payment = $http.get('/api/brides/'+ $scope.tempid);


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
                  alert(bride.payment);

                  }, function(err) {

                      console.log(err);

                  })

            }, function(err) {

                console.log(err);

            })

     }
     $scope.getPayOfBride = function(){
                  $scope.pay =  [];
                  $scope.data = [];
                  $scope.done = [];
                  for(i=0; i < $scope.payment.lenght; i++){
                    console.log( ' payment i' + i);
                    $scope.pay = $scope.payment[i].pay ;
                    $scope.data = $scope.payment[i].data_pay ;
                    $scope.done = $scope.payment[i].done ;
                  };
                  alert($scope.payment[0].pay);


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
  // nedd do edit
  };
  initBride();
});

// app.controller('paymentByBrideController', function($scope , paymentService, brideService , $route) {
//     console.log('we r in paymentByBrideController 111 ')
//     $scope.tempid = $route.current.params.brideid;
//     $scope.payment = paymentService.get({id: $scope.tempid});

//     $scope.payment = function(){
//       //$scope.newPayment.bride = $route.current.params.brideid;
//       paymentService.save($scope.newPayment, function(){
//             $scope.payments = paymentService.query();
//             $scope.newPayment = {
//                     bride:'',
//                    // total_price:'',
//                 	  pay:'',
//                     date_pay:'',
//                     done:''
//             };


//       });
//     };
//   });


