  angular.module('mainApp');
   app.controller('brideInfoController', function($scope ,$rootScope, brideService ,$route , $http , $q) {
     init = function(){
        var sizeIsEmpty;
         $rootScope.sizeid;
          getOneBride(); 
     };
     	$scope.modify = function(bride){
				$scope.modifyField = true;
				$scope.viewField = true;
			};
		
    $scope.update = function(bride){
            $scope.upBride = {};
            console.log('----updateBride----');
            console.log(bride);
            upBride = {
                created_at : bride.created_at,
                b_id :bride.b_id,
                first_name : bride.first_name,
                last_name :bride.last_name,
                email :bride.email,
                phone1 : bride.phone1,
                phone2 : bride.phone2,
                adress: bride.adress,
                date_event : bride.date_event,
                dress_type: bride.dress_type,
                dress_type2 :bride.dress_type2,
                day_service : bride.day_service,
                price: bride.price,
                remark:bride.remark
            };
            $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
              	$scope.modifyField = false;
			        	$scope.viewField = false;
              console.log(res);
            },function(err){
              console.log(err);
            }) 

     };
      // get() returns a single bride
     getOneBride = function(){
         $scope.tempid = $route.current.params.brideid;
         $scope.bride = brideService.get({id: $scope.tempid});
      
         //get payment 
         $http.get('/api/brides/'+ $scope.tempid).then(function(res) {
                            $scope.brideWithPayment = res.data;
                            // calc all payments
                                  $scope.getTotal = function(){
                                        var total = 0;
                                        for(var i=0; i < $scope.brideWithPayment.payments.length; i++){
                                          console.log( $scope.brideWithPayment.payments[i]);
                                            var payment = $scope.brideWithPayment.payments[i];
                                            total += payment.pay;
                                        }
                                        return total;
                                      };
                                      $scope.allowPay = function(state){
                                              console.log('allowPay');

                                              var total =  getTotal();
                                              console.log('total');
                                              if(total <= brideWithPayment.price)
                                              {
                                                $scope.allowPay = true;
                                                return true;
                                              }
                                              else {
                                                $scope.allowPay = false;
                                                return false;
                                              }
                                    }
                 
                          }, function(err) {
                        })
         //get sizes 
         $http.get('/api/bridesizes/'+ $scope.tempid).then(function(res) {
                            console.log(res);
                            if(res.data.sizes[0] == null)
                            {
                              //post size
                               $http.post('/api/sizes', $scope.newSize ).then(function(res) {
                                  $http.put('/api/sizes/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                                    
                                      $rootScope.sizeid = res.data._id;
                                       getOneBride();
                                      
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
                                alert('full');
                                 $scope.brideWithSize = res.data;
                                 console.log( '$scope.brideWithSize++++++++++++');
                              console.log( $scope.brideWithSize);
                            }
                   
         }, function(err) {
            console.log(err);
           });
     }

     $scope.addPayment = function(Payment){
        $http.post('/api/payments', $scope.newPayment ).then(function(res) {
              //  $scope.allPayments = $scope.newPayment.pay;
               $http.put('/api/payments/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                        $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            $scope.brideWithPayment = res.data;
                              console.log('brideWithPayment');
                              console.log( $scope.brideWithPayment);
                          }, function(err) {
                        })
                    }, function(err) {
                      console.log(err);
                  })
            }, function(err) {
                console.log(err);
            })
     };

     $scope.delPayment=function(id){
        $http.delete('/api/payments/'+ $scope.tempid +'/'+ id ).then(function(res) {
          $http.delete('/api/payments/'+id ).then(function(res) {
                      $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            $scope.brideWithPayment = res.data;
                          }, function(err) {
                      });
                      }, function(err) {
                        console.log(err);
                    })
              }, function(err) {
                  console.log(err);
              })
     };


      $scope.sizeModify = function(newSize){
        console.log(newSize);
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


