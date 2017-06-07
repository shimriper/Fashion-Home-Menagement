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
            $scope.upDress = {};
            upDress = {
              	last_update: Date.now(),
                t_dress : dress.t_dress,
                model :dress.model,
                color : dress.color,
                t_cloth :dress.t_cloth,
                t_lace :dress.t_lace,
                cleavage_detailes : dress.cleavage_detailes,
                stitch_back : dress.stitch_back,
                cleft_place: dress.cleft_place,
                sleeve : dress.sleeve,
                another_skirt: dress.another_skirt,
                remark: dress.remark,
            };
                $http.put('/api/dresses/update' , {id:id , updatedObj:upDress}).then(function(res){
                  if(res.data.message == 'success'){
                    // check this 
                       getOneDress();
                       $scope.dressModifyField = false;
                       $scope.dressViewField = false;
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
                getOneDress();
		};
    //   end update
        $scope.sizeModify = function(newSize){
				$scope.sizeModifyField = true;
				$scope.sizeViewField = true;
			};

      $scope.upSize =function (size, id){
            console.log('deleting user with id='+size+' at index='+id);
             $scope.upSize = {};
            console.log('----updateSize----');
            upSize = {
              	last_update: Date.now(),
                chest : size.chest,
                waist :size.waist,
                hips : size.hips,
                upChest :size.upChest,
                downChest :size.downChest,
                breast_seam : size.breast_seam,
                stitch_back : size.stitch_back,
                front_width: size.front_width,
                back_width : size.back_width,
                chest_weidh: size.chest_weidh,
                hip_lenght :size.hip_lenght,
                side_lenght : size.side_lenght,
                shoulder: size.shoulder,
                sleeve_length:size.sleeve_length,
                dress_lenght: size.dress_lenght,
                top_lenght:size.top_lenght
            };
            
                $http.put('/api/sizes/update' , {id:id , updatedObj:upSize}).then(function(res){
                    $scope.sizeModifyField = false;
                    $scope.sizeViewField = false;
                  console.log(res);
                },function(err){
                  console.log(err);
                }) ;

      };
    init();
   });
      
 




