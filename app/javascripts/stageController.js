
angular.module('mainApp');

app.controller('stageController' ,function($scope ,$rootScope, brideService ,$route , $http , $q ,$location,$window){
  var s=[];
  var stage2;
  var done =false;
   init = function(){ 
      checkStage();

      $scope.dressInfoRoute = function(id){  
          $scope.brideid = $route.current.params.brideid;
          
      };
   }
    
      stages = function(){
                $scope.s1 = s[0];
                if($scope.s1 == true){
                    $scope.s2 = s[1];
                    if($scope.s2 == true){
                        $scope.s3 = s[2];
                        if($scope.s3 == true){
                           $scope.s4 = s[3]; 
                        }
                    }
                }
      }
       
     checkStage = function(){
         var stageid;
         $scope.tempid = $route.current.params.brideid;
         $http.get('/api/bridestages/'+ $scope.tempid).then(function(res) {
                for(var i=0; i <res.data.stages.length; i++){
                    stageid =  res.data.stages[i];
                    if(stageid != undefined){  
                      console.log('true' + stageid);
                      s[i] = true;
                      if(i ==1 ){
                        $scope.stage2 = res.data.stages[i].s;
                      }
                   
                    }
                    else
                    if( stageid === undefined){
                                          console.log('false' + stageid);
                      s[i] = false;
                    }
                }
                stages();
                
         }, function(err) {
            console.log(err);
           });
     };
        $scope.sendStage = function(Stage){
           $scope.tempid = $route.current.params.brideid;
           var stage = {s: '',last_update:'' };
           stage.s = Stage.s;
           stage.last_update = Date.now();
        $http.post('/api/stages', stage ).then(function(res) {
               $http.put('/api/stages/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                        $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                          console.log(res.data);
                          }, function(err) {
                        })
                    }, function(err) {
                      console.log(err);
                  })
            }, function(err) {
                console.log(err);
            })
      };
     $scope.finishStage = function(){
          
      $scope.tempid = $route.current.params.brideid;

      var stage = {s: '',last_update:'' };
        stage.s = 'שלב 3';
        stage.last_update = Date.now();

        $http.post('/api/stages', stage ).then(function(res) {
               $http.put('/api/stages/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                        $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            $scope.brideWithStage = res.data;
                                      // $scope.bride= $scope.bride;
                           $location.path('stage/' + $scope.tempid );           
                          }, function(err) {
                        })
                    }, function(err) {
                      console.log(err);
                  })
            }, function(err) {
                console.log(err);
            })
      };
      $scope.finishStageFinel = function(){
          
      $scope.tempid = $route.current.params.brideid;

      var stage = {s: '',last_update:'' };
        stage.s = 'שלב 4';
        stage.last_update = Date.now();

        $http.post('/api/stages', stage ).then(function(res) {
               $http.put('/api/stages/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                        $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            $scope.brideWithStage = res.data;
                                      // $scope.bride= $scope.bride;
                           $location.path('stage/' + $scope.tempid );           
                          }, function(err) {
                        })
                    }, function(err) {
                      console.log(err);
                  })
            }, function(err) {
                console.log(err);
            })
      };
      //      $scope.finishStage = function(){
          
      // $scope.tempid = $route.current.params.brideid;

      // var stage = {s: '',last_update:'' };
      //   stage.s = 'שלב 1';
      //   stage.last_update = Date.now();

      //   $http.post('/api/stages', stage ).then(function(res) {
      //          $http.put('/api/stages/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
      //                   $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
      //                       $scope.brideWithStage = res.data;
      //                                 // $scope.bride= $scope.bride;
      //                      $location.path('stage/' + $scope.tempid );           
      //                     }, function(err) {
      //                   })
      //               }, function(err) {
      //                 console.log(err);
      //             })
      //       }, function(err) {
      //           console.log(err);
      //       })
      // };
    
     $scope.forwordStage = function(){
          
          $location.path('brideInfo/' + $scope.tempid );
     };
     init();
});