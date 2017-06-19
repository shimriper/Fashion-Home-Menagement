 angular.module('mainApp');
  app.controller('adminDashController', function($rootScope ,$scope , brideService, $http, $location) {
    
    var countOfBride = 0;
    var countState = 0;
    var countOfevening = 0;
    var countStateWait =0;
    var brides;// get all brides
    var bridesMony;
    var countDresses=0;
    var countStateClose = 0;
    var paysDoneSum =0; 
    var paysTotalSum =0; 

    var priceOfBrideDress = 0;
    var priceOfEvnDress = 0;
    var countOfBrideDress = 0;
    var countOfEvnDress = 0;

    init = function(){
         getBrideDonat();
            
   
    }

    countOfTypeDress = function(bride){
      alert("we r in countOfTypeDress" + bride.dresses.length);
              for(var i=0; i<bride.dresses.length;i++){
                  $http.get('/api/dresses/'+  bride.dresses[i]._id).then(function(res) {
                          var dress = res.data;  
                          alert(dress); 
                          if(dress.t_dress == "כלה" ){
                              alert(dress.price_dress);
                                priceOfBrideDress += dress.price_dress;
                                countOfBrideDress ++ ;
                            }
                            else if(dress.t_dress == "ערב"){
                                alert(dress.price_dress);
                                priceOfEvnDress += dress.price_dress;
                                countOfEvnDress ++ ;
                            }
                          console.log($scope.dress);
                  }, function(err) {
                      console.log(err);
                  });
              }

            //    $http.get('/api/bridedresses/'+ bride.dresses[i]._id).then(function(res) {

            //     var brideWithDress1 = res.data;  
            //     console.log("brideWithDress1" + brideWithDress1.dresses._id);
            //     for(var i=0; i <brideWithDress1.dresses.length; i++){
            //          if(brideWithDress1.dresses[i].t_dress == "כלה" ){
            //            alert(brideWithDress1.dresses[i].price_dress);
            //             priceOfBrideDress += brideWithDress1.dresses[i].price_dress;
            //             countOfBrideDress ++ ;
            //          }
            //          else if(brideWithDress1.dresses[i].t_dress == "ערב"){
            //             alert(brideWithDress1.dresses[i].price_dress);
            //             priceOfEvnDress += brideWithDress1.dresses[i].price_dress;
            //             countOfEvnDress ++ ;
            //          }
            //     }          
            //   },  function(err) {
            //     console.log(err);
            // }); 
    }

    getBrideDonat = function(){
         $http.get('/api/brides').then(function(res) {
               brides = res.data;  
               bridesMony = brides; 
                  console.log( brides);
                  sumState ();
                         $scope.labels = ["פעיל", "ממתין","סגור"];
                         $scope.data = [countState, countStateWait,countStateClose];
                  sumDresses();
                  getMoney(bridesMony);
     
 
              } ,  function(err) {
                console.log(err);
            });             
         
          // console.log( $scope.brides.bride.length + 'brides');
          sumState =function(){
              for(var i=0; i < brides.length; i++){
                var status = brides[i].status;
                if( status == "פעיל"){
                   countState += 1;
                }
                else if(status == "סגור"){
                  countStateClose +=1;
                }
                else{
                  countStateWait += 1;
                }
                countOfTypeDress(brides[i]);
              }
              $scope.numOfClient = countState +countStateWait;
              // console.log( countState);
         }
          sumDresses = function(){
                  for(var i=0; i < brides.length; i++){
                      countDresses += brides[i].dresses.length;
                  }
                  $scope.cDress = countDresses;
                  
          }
    }
    getMoney = function(bridesMony){  
            for(var i=0; i<bridesMony.length; i++){
                var idB = bridesMony[i]._id;
                    $http.get('/api/brides/'+ idB).then(function(res) {
                                  $scope.brideWithPaymentFor = res.data;                       
                                  // calc all payments
                                       getTotal( $scope.brideWithPaymentFor);
                                      // alert("paysDoneSum" + paysDoneSum + $scope.brideWithPaymentFor.first_name );
                                      allPayment($scope.brideWithPaymentFor);
                                      // alert("paysTotalSum" + paysTotalSum);
                                      
                                }, function(err) {
                                  console.log(err);
                              })
            }
}
        getTotal = function(brideWithPayment){
          var total = 0;
          for(var i=0; i < brideWithPayment.payments.length; i++){
              var payment = brideWithPayment.payments[i];
              if(payment.done == true)
                  total += payment.pay;
          }
          paysDoneSum += total;
          $scope.paysDoneSum = paysDoneSum;
                  
        };
        allPayment = function(brideWithPayment){
            var total = 0;
              for(var i=0; i < brideWithPayment.payments.length; i++){
                  var payment = brideWithPayment.payments[i];
                  total += payment.pay;
              }
              paysTotalSum +=  total;
              $scope.paysTotalSum = paysTotalSum;
        }
        $scope.avgTotal = function(TotalSum,count){
          return (TotalSum/count);
        }
    init();
    

  
});

