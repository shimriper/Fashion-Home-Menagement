 angular.module('mainApp');
  app.controller('adminDashController', function($rootScope ,$scope , brideService, $http, $location) {
    
    var countOfBride = 0;
    var countState = 0;
    var countOfevening = 0;
    var countStateWait =0;
    var brides;// get all brides
    var countDresses=0;

    init = function(){
         getBrideDonat();
   
    }
    getBrideDonat = function(){
         $http.get('/api/brides').then(function(res) {
               brides = res.data;   
                  console.log( brides);
                  sumState ();
                         $scope.labels = ["פעיל", "ממתין"];
                         $scope.data = [countState, countStateWait];
                  sumDresses();
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
                else{
                  countStateWait += 1;
                }
              }
              // console.log( countState);
         }
        sumDresses = function(){
                for(var i=0; i < brides.length; i++){
                    countDresses += brides[i].dresses.length;
                }
                alert(countDresses);
        }
    }
    init();
  
});

