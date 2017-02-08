  angular.module('mainApp');
   app.controller('brideInfoController', function($scope ,$rootScope, brideService ,$route , $http , $q ,$location,$window) {
     init = function(){
        $scope.names = ["כלה", "ערב"];
        var sizeIsEmpty;
        var priceBride;
         $rootScope.sizeid;
          getOneBride(); 

     };
     	$scope.modify = function(bride){
				$scope.modifyField = true;
				$scope.viewField = true;
			};
		
    $scope.update = function(bride){
            $scope.upBride = {};
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
                day_service : bride.day_service,
                price: bride.price,
                remark:bride.remark,
                status:bride.status
            };
            $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
              	$scope.modifyField = false;
			        	$scope.viewField = false;
                  $window.location.reload();
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
                                            var payment = $scope.brideWithPayment.payments[i];
                                            if(payment.done == true)
                                                total += payment.pay;
                                        }
                                        return total;
                                      };
                                      $scope.allPayment = function(){
                                          var total = 0;
                                            for(var i=0; i < $scope.brideWithPayment.payments.length; i++){
                                                var payment = $scope.brideWithPayment.payments[i];
                                                total += payment.pay;
                                            }
                                            return total;
                                    }
                 
                          }, function(err) {
                        })

         //get dress
          $http.get('/api/bridedresses/'+ $scope.tempid).then(function(res) {
                $scope.brideWithDress = res.data;   
                $scope.getTotalPrice = function(){
                      var total = 0;
                      for(var i=0; i < $scope.brideWithDress.dresses.length; i++){
                          var dress = $scope.brideWithDress.dresses[i];
                              total += dress.price_dress;
                      }
                      priceBride = total;
                      return total;
                    };  
          
         }, function(err) {
            console.log(err);
         });
    };
    $scope.addDress = function(Dress , bridePrice){
      var t_dress = $scope.names;
      alert('t_dress' + t_dress);
        $http.post('/api/dresses', $scope.newDress ).then(function(res) {
                                      $scope.upBride = {};
                                      upBride = {
                                          t_dress:t_dress,
                                          price: res.data.price_dress + priceBride,
                                          };
                                          $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
                                              $scope.modifyField = false;
                                              $scope.viewField = false;
                                            console.log(res);
                                          },function(err){
                                            console.log(err);
                                          }) 
               $http.put('/api/dresses/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                        $http.get('/api/bridedresses/'+ $scope.tempid ).then(function(res) {
                            $scope.brideWithDress = res.data;
                            getOneBride();
                          }, function(err) {
                        })
                    }, function(err) {
                      console.log(err);
                  })
            }, function(err) {
                console.log(err);
            })
     };
     

    $scope.delDress = function(id,price_dress){
            $scope.upBride = {};
            upBride = {
                price:  priceBride - price_dress ,
                };
                $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
                    $scope.modifyField = false;
                    $scope.viewField = false;
                  console.log(res);
                },function(err){
                  console.log(err);
                }) 
        $http.delete('/api/dresses/'+ $scope.tempid +'/'+ id ).then(function(res) {
                                
          $http.delete('/api/dresses/'+id ).then(function(res) {
                      $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            $scope.brideWithDress = res.data;
                            getOneBride();
                          }, function(err) {
                      });
                      }, function(err) {
                        console.log(err);
                    })
              }, function(err) {
                  console.log(err);
              })
     };

     $scope.addPayment = function(Payment){
        $http.post('/api/payments', $scope.newPayment ).then(function(res) {
              //  $scope.allPayments = $scope.newPayment.pay;
               $http.put('/api/payments/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                        $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            $scope.brideWithPayment = res.data;
                              console.log('brideWithPayment');
                              console.log( $scope.brideWithPayment);
                                       $window.location.reload();
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
                             getOneBride();
                          }, function(err) {
                      });
                      }, function(err) {
                        console.log(err);
                    })
              }, function(err) {
                  console.log(err);
              })
     };
     $scope.upDress = function(dress , id,bride){
            $scope.upDress = {};
            upDress = {
                 t_dress: dress.t_dress,
                 price_dress: dress.price_dress,
            };  
                $http.put('/api/dresses/update' , {id:id , updatedObj:upDress}).then(function(res){
                          //get dress
                          $http.get('/api/bridedresses/'+ $scope.tempid).then(function(res) {
                                $scope.brideWithDress = res.data;   
                                $scope.getTotalPrice = function(){
                                      var total = 0;
                                      for(var i=0; i < $scope.brideWithDress.dresses.length; i++){
                                          var dress = $scope.brideWithDress.dresses[i];
                                              total += dress.price_dress;
                                      }
                                            $scope.upBride = {}; 
                                            upBride = {
                                                price:  total ,
                                                };
                                                $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
                                                          $scope.dressModifyField = false;
                                                          $scope.dressViewField = false;
                                                  console.log(res);
                                                },function(err){
                                                  console.log(err);
                                                }) 
                                    };  
                                    $window.location.reload();
                        })
                  console.log(res);
                  getOneBride();
                },function(err){
                  console.log(err);
                }) ;
     };
     $scope.upPayment = function(payment ,id){
            $scope.upPayment = {};
            upPayment = {
                pay : payment.pay,
                date_pay :payment.date_pay,
                done : payment.done,
            };
                $http.put('/api/payments/update' , {id:id , updatedObj:upPayment}).then(function(res){
                     getOneBride();
                    $scope.paymentModifyField = false;
                    $scope.paymentViewField = false;

                  console.log(res);
                    $window.location.reload();
                }
                ,function(err){
                  console.log(err);
                }) ;
                
     };

     $scope.paymentModify = function(newPayment){
				$scope.paymentModifyField = true;
				$scope.paymentViewField = true;
			};

      // $scope.sizeModify = function(newSize){
			// 	$scope.sizeModifyField = true;
			// 	$scope.sizeViewField = true;
			// };

      // $scope.upSize =function (size, id){
      //       console.log('deleting user with id='+size+' at index='+id);
      //        $scope.upSize = {};
      //       console.log('----updateSize----');
      //       upSize = {
      //         	last_update: Date.now(),
      //           chest : size.chest,
      //           waist :size.waist,
      //           hips : size.hips,
      //           upChest :size.upChest,
      //           downChest :size.downChest,
      //           breast_seam : size.breast_seam,
      //           stitch_back : size.stitch_back,
      //           front_width: size.front_width,
      //           back_width : size.back_width,
      //           chest_weidh: size.chest_weidh,
      //           hip_lenght :size.hip_lenght,
      //           side_lenght : size.side_lenght,
      //           shoulder: size.shoulder,
      //           sleeve_length:size.sleeve_length,
      //           dress_lenght: size.dress_lenght,
      //           top_lenght:size.top_lenght
      //       };
            
      //           $http.put('/api/sizes/update' , {id:id , updatedObj:upSize}).then(function(res){
                  
      //               $scope.sizeModifyField = false;
      //               $scope.sizeViewField = false;
      //             console.log(res);
      //           },function(err){
      //             console.log(err);
      //           }) ;

      // };

      $scope.dressModify = function(newDress){
				$scope.dressModifyField = true;
				$scope.dressViewField = true;
			};

    //  $scope.upDress =function (dress, id){
    //         $scope.upDress = {};
    //         upDress = {
    //           	last_update: Date.now(),
    //             t_dress : dress.t_dress,
    //             model :dress.model,
    //             color : dress.color,
    //             t_cloth :dress.t_cloth,
    //             t_lace :dress.t_lace,
    //             cleavage_detailes : dress.cleavage_detailes,
    //             stitch_back : dress.stitch_back,
    //             cleft_place: dress.cleft_place,
    //             sleeve : dress.sleeve,
    //             another_skirt: dress.another_skirt,
    //             remark: dress.remark,
        
    //         };
    //             $http.put('/api/dresses/update' , {id:id , updatedObj:upDress}).then(function(res){
    //                 $scope.dressModifyField = false;
    //                 $scope.dressViewField = false;
    //               console.log(res);
    //             },function(err){
    //               console.log(err);
    //             }) ;

    //   };

      $scope.dressInfoRoute = function(id){  
          $scope.brideid = $route.current.params.brideid;
          console.log(id);
          $location.path('dressInfo/' + $scope.brideid + '/' + id );
      };
    init();
  });


