 angular.module('mainApp');
  app.controller('adminDashController', function($rootScope ,$scope , brideService, $http, $location ,$filter) {
    
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

    var monthCountPrice = [12]
     var monthCont = [12];
     monthCountDress = [12];
     //init array to 0;
     for(var i =0; i<12;i++){
         monthCont[i] =0;
         monthCountPrice[i] = 0;
         monthCountDress[i] = 0;
     } 

  

    init = function(){
         getBrideDonat();
            
   
    }
    countOfTypeDress = function(brides){
              for(var j =0; j< brides.length; j++){
                for(var i=0; i<brides[j].dresses.length;i++){
                $http.get('/api/dresses/'+ brides[j].dresses[i]).then(function(res) {
                          var dress = res.data;  
                          
                          if(dress.t_dress == "כלה"){
                                priceOfBrideDress += dress.price_dress;
                                
                                countOfBrideDress ++ ;
                                
                            }
                            else if(dress.t_dress == "ערב"){
                                priceOfEvnDress += dress.price_dress;
                              
                                countOfEvnDress ++ ;
                            }
                            // all parm for graf
                            $scope.labels2 = ["כלה" , "ערב"];
                            $scope.data2 = [countOfBrideDress, countOfEvnDress];
                            $scope.countOfBrideDress = countOfBrideDress;
                            $scope.countOfEvnDress = countOfEvnDress;
                            $scope.priceOfEvnDress = priceOfEvnDress;
                            $scope.priceOfBrideDress = priceOfBrideDress;

                           
                  }, function(err) {
                      console.log(err);
                  });
              }
            }

          
            // $scope.labels2 = ["כלה" , "ערב"];
            // $scope.data2 = [countOfBrideDress, countOfEvnDress];
            $scope.type = 'polarArea';
            $scope.toggle = function () {
              $scope.type = $scope.type === 'polarArea' ?
                'pie' : 'polarArea';
            };
            $scope.priceOfBrideDressAvg = countOfBrideDress /priceOfBrideDress ; 
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
                  countOfTypeDress(bridesMony);
                  getBridesForGraph(brides);
                //   sumPrices(bridesMony);
                  // countTypeCastumer(bridesMony);
 
              } ,  function(err) {
                console.log(err);
            });  

             getBridesForGraph = function(brides){
                   console.log("brides************************************************");
                  console.log(brides);
                for(var i=0; i < brides.length; i++){
                    var bride_dateEvent = brides[i].date_event;
                    
                    var bride_dateEventM =  $filter('date')(new Date(bride_dateEvent),'MM');
                 
                    for (var j =0; j<12; j ++){
                        if(bride_dateEventM == '0' + j){
                            monthCont[j] ++;
                            if(brides[i].price != undefined)
                             monthCountPrice[j] = monthCountPrice[j] + brides[i].price;
                            if(brides[i].dresses.length != undefined)
                            monthCountDress[j] = monthCountDress[j] + brides[i].dresses.length;
                        }
                        if(bride_dateEventM == j && j > 9){
                            monthCont[j] ++;
                             if(brides[i].price != undefined)
                            monthCountPrice[j] = monthCountPrice[j] + brides[i].price;
                             if(brides[i].dresses.length != undefined)
                            monthCountDress[j] = monthCountDress[j] + brides[i].dresses.length;

                        }
                    }
                }
                     $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
                     $scope.labelsDate = ['ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];           
                     $scope.series = ['מונה לקוחות ', ' סה"ב הכנסה בחודש זה','סה"כ שמלות בחודש זה'];
                    
                     $scope.dataDate = [
                                        [monthCont[0], monthCont[1], monthCont[2], monthCont[3],monthCont[4], monthCont[5], monthCont[6],
                                                                        monthCont[7],monthCont[8],monthCont[9],monthCont[10],monthCont[11]],
                                        [monthCountPrice[0], monthCountPrice[1], monthCountPrice[2], monthCountPrice[3],monthCountPrice[4], monthCountPrice[5], monthCountPrice[6],
                                                                        monthCountPrice[7],monthCountPrice[8],monthCountPrice[9],monthCountPrice[10],monthCountPrice[11]],
                                        [monthCountDress[0], monthCountDress[1], monthCountDress[2], monthCountDress[3],monthCountDress[4], monthCountDress[5], monthCountDress[6],
                                                                        monthCountDress[7],monthCountDress[8],monthCountDress[9],monthCountDress[10],monthCountDress[11]],
                                    ];
                                    $scope.datasetOverride = [
                                        {
                                            type : "bar",
                                            label: "מונה לקוחות",
                                            borderWidth: 1,
                                            data:                      [monthCont[0], monthCont[1], monthCont[2], monthCont[3],monthCont[4], monthCont[5], monthCont[6],
                                                                        monthCont[7],monthCont[8],monthCont[9],monthCont[10],monthCont[11]]
                                           
                                        },
                                        {
                                            type : "line",
                                            label: " סה''כ כל ההכנסות לחודש זה ",
                                            data : [monthCountPrice[0], monthCountPrice[1], monthCountPrice[2], monthCountPrice[3],monthCountPrice[4], monthCountPrice[5], monthCountPrice[6],
                                                                        monthCountPrice[7],monthCountPrice[8],monthCountPrice[9],monthCountPrice[10],monthCountPrice[11]],
                                            borderWidth: 3,
                                            hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                            hoverBorderColor: "rgba(255,99,132,1)",
                                             
                                        },
                                              {
                                                  type : "bar",
                                            label: "מונה שמלות",
                                            borderWidth: 1,
                                            data:                      [monthCountDress[0], monthCountDress[1], monthCountDress[2], monthCountDress[3],monthCountDress[4], monthCountDress[5], monthCountDress[6],
                                                                        monthCountDress[7],monthCountDress[8],monthCountDress[9],monthCountDress[10],monthCountDress[11]]
                                           
                                        },
                                        ];
                // dataG={
                //     labels: ['ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'],
                //     dataset:[
                //         {
                //              label: "מונה לקוחות",
                //             fillColor:"rgba(153,0,76,0.2)",
                //             strokeColor:"rgba(153,0,76,1)",
                //             pointColor:"rgba(153,0,76,1)",
                //             pointStrokeColor:"#fff",
                //             pointHighlightFill:"#fff",
                //             pointHighlightStroke:"rgba(153,0,76,1)",
                //             data:[monthCont[0], monthCont[1], monthCont[2], monthCont[3],monthCont[4], monthCont[5], monthCont[6],
                //                                                         monthCont[7],monthCont[8],monthCont[9],monthCont[10],monthCont[11]]

                //         },
                //                          {
                //             label: " סה''כ כל ההכנסות לחודש זה ",
                //             fillColor:"rgba(153,0,76,0.2)",
                //             strokeColor:"rgba(153,0,76,1)",
                //             pointColor:"rgba(153,0,76,1)",
                //             pointStrokeColor:"#fff",
                //             pointHighlightFill:"#fff",
                //             pointHighlightStroke:"rgba(153,0,76,1)",
                //             data : [monthCountPrice[0], monthCountPrice[1], monthCountPrice[2], monthCountPrice[3],monthCountPrice[4], monthCountPrice[5], monthCountPrice[6],
                //                                                         monthCountPrice[7],monthCountPrice[8],monthCountPrice[9],monthCountPrice[10],monthCountPrice[11]]
                //         }
                //     ]       

                // };
           
         
            }
                  
        // sumPrices = function(bridesMony){
        //     // alert(bridesMony.length);
        //     for(var i=0; i < bridesMony.length; i++){
        //         cPrice += bridesMony[i].price;
        //         console.log(cPrice);
        //     }
        // }
          // console.log( $scope.brides.bride.length + 'brides');
          sumState =function(){
              var cPrice = 0;
              for(var i=0; i < brides.length; i++){
                var status = brides[i].status;
                if(brides[i].price != undefined){
                    cPrice += brides[i].price;
                }
                if( status == "פעיל"){
                   countState += 1;
                }
                else if(status == "סגור"){
                  countStateClose +=1;
                }
                else{
                  countStateWait += 1;
                }
              }
              $scope.tPrice = cPrice;
              $scope.numOfClient = countState +countStateWait;
         }
          sumDresses = function(){
                  for(var i=0; i < brides.length; i++){
                      countDresses += brides[i].dresses.length;
                  }
                  $scope.cDress = countDresses;
                  
          }

    }
    getMoney = function(bridesMony){  
            for(var i=0; i< bridesMony.length; i++){
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

