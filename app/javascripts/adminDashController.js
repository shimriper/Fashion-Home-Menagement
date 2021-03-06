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
    var monthCountDress = [13];
    var monthCountFacebook = [13];
     var monthCountMetchatnim = [13];
    var monthCountWebsite = [13];
    var monthCountfrindes = [13];

    var waitCastumer = [13];
    var castumer = [13];
    var cPercent = [13];

     //init array to 0;
      for(var i =0; i<=12;i++){
         monthCont[i] =0;

         monthCountPrice[i] = 0;
         monthCountDress[i] = 0;

         monthCountFacebook[i] = 0;
         monthCountMetchatnim[i] =0;
         monthCountWebsite[i] = 0;
         monthCountfrindes[i] = 0;
 
         castumer[i] =0;
         waitCastumer[i] =0;
         cPercent[i] = 0;
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
                                    //  console.log('$scope.bridesWeek')    ; 
                                    // console.log($scope.bridesWeek)    ;                                       
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
                            if( (brides[i].status == "פעיל" || brides[i].status == "סגור") ){
                                castumer[j] ++;
                            }
                            else if (  brides[i].status == "ממתין"){
                                waitCastumer[j] ++;
                            }
                    
                            if(brides[i].advertising != undefined){
                                if(brides[i].advertising == "facebook" ){
                                    monthCountFacebook[j] ++;
                                }
                                else if (brides[i].advertising == "מתחתנים"){
                                    monthCountMetchatnim[j] ++;
                                }
                                else if (brides[i].advertising == "אתר הבית"){
                                    monthCountWebsite[j] ++;
                                }
                                else if (brides[i].advertising == "חבר מביא חבר"){
                                    monthCountfrindes[j] ++;
                                }
                             }
                        
                            if(brides[i].price != undefined)
                             monthCountPrice[j] = monthCountPrice[j] + brides[i].price;
                            if(brides[i].dresses.length != undefined)
                            monthCountDress[j] = monthCountDress[j] + brides[i].dresses.length;
                        }
                       else if(bride_dateEventM == j && j > 9){
                            monthCont[j] ++;
                            if(brides[i].status == "פעיל" ||brides[i].status =="סגור"){
                                castumer[j] ++;
                            }
                            else if (brides[i].status == "ממתין" ){
                                waitCastumer[j] ++;
                            }
                            if(brides[i].advertising != undefined){
                                if(brides[i].advertising == "facebook" ){
                                    monthCountFacebook[j] ++;
                                }
                                else if (brides[i].advertising == "מתחתנים"){
                                    monthCountMetchatnim[j] ++;
                                }
                                else if (brides[i].advertising == "אתר הבית"){
                                    monthCountWebsite[j] ++;
                                }
                                else if (brides[i].advertising == "חבר מביא חבר"){
                                    monthCountfrindes[j] ++;
                                }
                            }
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


                    
                     $scope.labelsDate = [ 'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];           

                       $scope.colorsAdvertising = ['#45b7cd', '#ff6384', '#ff8e72','#322e72'];
                     $scope.labelsAdvertising = [ 'facebook', 'מתחתנים', 'אתר האינטרנט', 'חבר מביא חבר'];           
                    
                     $scope.dataAdvertising = [
                                        [monthCountFacebook[1], monthCountFacebook[2], monthCountFacebook[3], monthCountFacebook[4],monthCountFacebook[5], monthCountFacebook[6], monthCountFacebook[7],
                                                                        monthCountFacebook[8],monthCountFacebook[9],monthCountFacebook[10],monthCountFacebook[11],monthCountFacebook[12]],
                                        [ monthCountMetchatnim[1], monthCountMetchatnim[2], monthCountMetchatnim[3],monthCountMetchatnim[4], monthCountMetchatnim[5], monthCountMetchatnim[6],
                                                                        monthCountMetchatnim[7],monthCountMetchatnim[8],monthCountMetchatnim[9],monthCountMetchatnim[10],monthCountMetchatnim[11] ,monthCountDress[12]],
                                         [ (monthCountWebsite[1]), (monthCountWebsite[2]), (monthCountWebsite[3]),(monthCountWebsite[4]),(monthCountWebsite[5]), (monthCountWebsite[6]),
                                                                        (monthCountWebsite[7]),(monthCountWebsite[8]),(monthCountWebsite[9]),(monthCountWebsite[10]),(monthCountWebsite[11]),(monthCountWebsite[12])],
                                         [ monthCountfrindes[1], monthCountfrindes[2], monthCountfrindes[3],monthCountfrindes[4], monthCountfrindes[5], monthCountfrindes[6],
                                                                        monthCountfrindes[7],monthCountfrindes[8],monthCountfrindes[9],monthCountfrindes[10],monthCountfrindes[11] ,monthCountfrindes[12]]
                                    ];
                                    $scope.datasetOverrideAdvertising = [
                                        {
                                            label: "facebook",
                                            borderWidth: 1
                                            
                                        },
                                            {
                                            label: "מתחתנים",
                                            borderWidth: 1
                                          
                                          
                                        },
                                         {
                                            label: " אתר הבית",
                                            borderWidth: 1
                                          
                                          
                                        },
                                        {
                                            label: "חבר מביא חבר",
                                            
                                            borderWidth: 1  
                                        }
                                        ];
                                        
                                    for(var i = 1; i < 13; i++){
                                            if(castumer[i] == 0 && waitCastumer[i]==0){
                                                cPercent[i] = 0 ;
                                            }
                                            cPercent[i] = (castumer[i]/(castumer[i] + waitCastumer[i]))*100; 
                                            cPercent[i] = cPercent[i];
                                    }


                        $scope.labelsDate = [ 'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];           

                       $scope.colorsCastumer = ['#45b7cd', '#ff6384', '#ff8e72','#322e72'];
                    //  $scope.labelsAdvertising = [ 'facebook', 'מתחתנים', 'אתר האינטרנט', 'חבר מביא חבר'];           
                    
                     $scope.dataCastumer = [
                                        [castumer[1], castumer[2], castumer[3], castumer[4],castumer[5], castumer[6], castumer[7],
                                                                        castumer[8],castumer[9],castumer[10],castumer[11],castumer[12]],
                                        [ waitCastumer[1], waitCastumer[2], waitCastumer[3],waitCastumer[4], waitCastumer[5], waitCastumer[6],
                                                                       waitCastumer[7],waitCastumer[8],waitCastumer[9],waitCastumer[10],waitCastumer[11] ,waitCastumer[12]],
                                        [cPercent[1], cPercent[2], cPercent[3],cPercent[4], cPercent[5], cPercent[6],
                                                                       cPercent[7],cPercent[8],cPercent[9],cPercent[10],cPercent[11] ,cPercent[12]]
                                     ];
                                    $scope.datasetOverrideCastumer = [
                                        {
                                            label: "פעיל / סגור",
                                            borderWidth: 1
                                            
                                        },
                                            {
                                            label: "ממתינים",
                                            borderWidth: 1                                         
                                        },
                                        {
                                            label: "אחוז סגירות",
                                            type:'line',
                                            borderWidth: 3,
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

