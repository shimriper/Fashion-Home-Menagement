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

    var monthCountPrice = [13]
     var monthCont = [13];
     monthCountDress = [13];
     //init array to 0;
      for(var i =0; i<=12;i++){
         monthCont[i] =0;
         monthCountPrice[i] = 0;
         monthCountDress[i] = 0;
      }
     initArr = function(arr){
            for(var i =0; i<=12;i++){
                arr[i] =0;
            }
       return arr;
     } 

  

    init = function(){
         getBrideDonat();
            
   
    }
    countOfTypeDress = function(brides){
              for(var j =0; j< brides.length; j++){
                  if(brides[j].status =="פעיל"){
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
                    $scope.type = 'polarArea';
                    $scope.toggle = function () {
                    $scope.type = $scope.type === 'polarArea' ?
                        'pie' : 'polarArea';
                    };
                    $scope.priceOfBrideDressAvg = countOfBrideDress /priceOfBrideDress ; 
              }
    }

    getBrideWeek = function(brides){
   

            var curr = new Date; // get current date
            var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6

            var firstday = new Date(curr.setDate(first)).toUTCString();
            var lastday = new Date(curr.setDate(last)).toUTCString();
                   
            firstday =  $filter('date')(new Date(firstday),'yyyy-MM-dd');
            lastday =  $filter('date')(new Date(lastday),'yyyy-MM-dd');


               $http.get('api/brideByDate/' +firstday+'/'+ lastday)
                                .then(function(res){
                                    $scope.bridesWeek = res.data;  
                                     console.log('$scope.bridesWeek')    ; 
                                    console.log($scope.bridesWeek)    ;                                       
                                }), function(err){
                                console.log(err); 
                                };
    }


    getBrideDonat = function(){
         $http.get('/api/brides').then(function(res) {
               brides = res.data;  
               bridesMony = brides; 
                  sumState ();
                         $scope.labels = ["פעיל", "ממתין","סגור"];
                         $scope.data = [countState, countStateWait,countStateClose];
                  sumDresses();
                  getMoney(bridesMony);
                  countOfTypeDress(bridesMony);
                  getBrideWeek(brides);
                  getBridesForGraph(brides);
                //   sumPrices(bridesMony);
                  // countTypeCastumer(bridesMony);
 
              } ,  function(err) {
                console.log(err);
            });  
            $scope.getBrdideByDate = function(startDate,endDate ){
                    if(startDate == null ||endDate == null ){
                        $scope.filterDate = false;
                    }
                    else{
                    

                        startDate =  $filter('date')(new Date(startDate),'yyyy-MM-dd');
                        endDate =  $filter('date')(new Date(endDate),'yyyy-MM-dd')
                        $http.get('api/brideByDate/' +startDate+'/'+ endDate)
                                .then(function(res){
                                    $scope.filterDate = true;
                                    var brideByDate = res.data;
                                    $scope.brideByDate = brideByDate;  
                                        //init arr to 0;
                                    monthCont = initArr(monthCont);
                                    monthCountPrice = initArr(monthCountPrice);
                                    monthCountDress = initArr(monthCountDress);
                                    getBridesForGraph(brideByDate) ;   
                                }), function(err){
                                console.log(err); 
                                };
                    }
                 }
                $scope.unFilter = function(){
                    $scope.filterDate = false;
                    getBridesForGraph(brides);
                }

             getBridesForGraph = function(brides){
                for(var i=0; i < brides.length; i++){
                    var bride_dateEvent = brides[i].date_event;
                    
                    var bride_dateEventM =  $filter('date')(new Date(bride_dateEvent),'MM');
                 
                    for (var j =1; j<=12; j ++){
                        if(bride_dateEventM == '0' + j && j<10){
                            monthCont[j] ++;
                            if(brides[i].price != undefined)
                             monthCountPrice[j] = monthCountPrice[j] + brides[i].price;
                            if(brides[i].dresses.length != undefined)
                            monthCountDress[j] = monthCountDress[j] + brides[i].dresses.length;
                        }
                       else if(bride_dateEventM == j && j > 9){
                            monthCont[j] ++;
                             if(brides[i].price != undefined)
                            monthCountPrice[j] = monthCountPrice[j] + brides[i].price;
                             if(brides[i].dresses.length != undefined)
                            monthCountDress[j] = monthCountDress[j] + brides[i].dresses.length;
                          }
                    }
                }
                     $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
                     $scope.labelsDate = [ 'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];           
                     $scope.series = ['מונה לקוחות ', ' סה"ב הכנסה בחודש זה','סה"כ שמלות בחודש זה'];
                    
                     $scope.dataDate = [
                                        [monthCont[1], monthCont[2], monthCont[3], monthCont[4],monthCont[5], monthCont[6], monthCont[7],
                                                                        monthCont[8],monthCont[9],monthCont[10],monthCont[11],monthCont[12]],
                                        [ monthCountDress[1], monthCountDress[2], monthCountDress[3],monthCountDress[4], monthCountDress[5], monthCountDress[6],
                                                                        monthCountDress[7],monthCountDress[8],monthCountDress[9],monthCountDress[10],monthCountDress[11] ,monthCountDress[12]],
                                                                         [ (monthCountPrice[1]/ 10000), (monthCountPrice[2]/ 10000), (monthCountPrice[3]/ 10000),(monthCountPrice[4]/ 10000),(monthCountPrice[5]/ 10000), (monthCountPrice[6]/ 10000),
                                                                        (monthCountPrice[7]/ 10000),(monthCountPrice[8]/ 10000),(monthCountPrice[9]/ 10000),(monthCountPrice[10]/ 10000),(monthCountPrice[11]/ 10000),(monthCountPrice[12]/ 10000)]
                                    ];
                                    $scope.datasetOverride = [
                                        {
                                            label: "מונה לקוחות",
                                            borderWidth: 1,
                                            
                                        },
                                            {
                                            label: "מונה שמלות",
                                            borderWidth: 1,
                                          
                                          
                                        },
                                        {
                                            label: " סה''כ כל ההכנסות לחודש זה ",
                                              type:'line',
                                            borderWidth: 3,
                                            hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                            hoverBorderColor: "rgba(255,99,132,1)", 
                                            
                                        }
                                        ];
               }
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
                      if(brides[i].status == "פעיל"){
                            countDresses += brides[i].dresses.length;
                      }
                      
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

