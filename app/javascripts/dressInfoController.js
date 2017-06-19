  angular.module('mainApp');
   app.controller('dressInfoController', function($scope ,$rootScope, brideService, stageService ,$route , $http , $q , $location ,$window) {
    var stageid;
    var s1;
     init = function(){
 
          getOneDress($scope.dressid); 
            $scope.tempid = $route.current.params.brideid;
            $scope.dressid = $route.current.params.dressid;
     };

     $scope.s1State = function(){
            if(s1 == false)
            {
              return false;
            }
            else
              return true;
          }
     
      $scope.finishStage = function(){
          
      $scope.tempid = $route.current.params.brideid;

      var stage = {s: '',last_update:'' };
        stage.s = 'שלב 1';
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
      // get() returns a single bride
        getOneDress = function(){
            $scope.tempid = $route.current.params.brideid;
            $scope.dressid = $route.current.params.dressid;
            $scope.bride = brideService.get({id: $scope.tempid});
            

            //get dress
            $http.get('/api/dresses/'+ $scope.dressid).then(function(res) {
                    $scope.dress = res.data;   
                    console.log($scope.dress);
            }, function(err) {
                console.log(err);
            });
           
          //checkStage();
                 //get sizes 
         $http.get('/api/bridesizes/'+ $scope.tempid).then(function(res) {
                            if(res.data.sizes[0] == null)
                            {
                              //post size
                               $http.post('/api/sizes', $scope.newSize ).then(function(res) {
                                  $http.put('/api/sizes/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                                    
                                      $rootScope.sizeid = res.data._id;
                                       getOneDress();
                                      
                                      console.log( $rootScope.sizeid);
                                  }, function(err) {
                                    console.log(err);
                                  });  
                                 console.log(res);
                                  }, function(err) {
                                    console.log(err);
                                  });
                            }
                            else
                            {
                                 $scope.brideWithSize = res.data;        
                            }                   
         }, function(err) {
            console.log(err);
           });
           checkStage();
     };
     checkStage = function(){
         $scope.tempid = $route.current.params.brideid;
         $http.get('/api/bridestages/'+ $scope.tempid).then(function(res) {
                  stageid =  res.data.stages[0];
                  if(stageid != undefined){  
                    console.log('true' + stageid);
                    s1 = true;
                  }
                  else
                  if( stageid === undefined){
                                        console.log('false' + stageid);

                    s1  = false;
                  }
         }, function(err) {
            console.log(err);
           });
     };
        //  update dress
        $scope.upDress =function (dress, id){
              $scope.dressModifyField = false;
              $scope.dressViewField = false;
              var upDress = dress;

                $http.put('/api/dresses/update' , {id:id , updatedObj:upDress}).then(function(res){
                  if(res.data.message == 'success'){
                          //  get dress
                              $http.get('/api/dresses/'+ $scope.dressid).then(function(res) {
                                      $scope.dress = res.data;   
                                      console.log($scope.dress);
                              }, function(err) {
                                  console.log(err);
                              });                   
                  }
                  console.log(res);
                },function(err){
                  console.log(err);
                }) ;                                     
              // $window.location.reload();
      };
        $scope.dressModify = function(newDress){
              $scope.dressModifyField = true;
              $scope.dressViewField = true;
              
		};
    //   end update
        $scope.sizeModify = function(newSize){
				$scope.sizeModifyField = true;
				$scope.sizeViewField = true;
			};

      $scope.upSize =function (size, id){
              $scope.sizeModifyField = false;
              $scope.sizeViewField = false;
              // $scope.upSize = {};
              var upSize = size;
     
            
                $http.put('/api/sizes/update' , {id:id , updatedObj:upSize}).then(function(res){
                    if(res.data.message ==' succesfully saved'){
                        console.log(res);
                         $http.get('/api/bridesizes/'+ $scope.tempid).then(function(res) {
                                 $scope.brideWithSize = res.data;        
                         }, function(err) {
                            console.log(err);
                          });
                      }
                },function(err){
                  console.log(err);
                }) ;

      };
    init();
   });
      
 




