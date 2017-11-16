  angular.module('mainApp');
   app.controller('brideInfoController', function($scope ,$rootScope, brideService ,$route , $http , $q ,$location,$window) {
     init = function(){
       var status;
        $scope.names = ["כלה" , "ערב"];
        var sizeIsEmpty;
        var priceBride;
         $rootScope.sizeid;
          getOneBride(); 

     };


     	$scope.modify = function(bride){
				$scope.modifyField = true;
				$scope.viewField = true;
			};
    $scope.dpay = function(dpay){
        if(dpay == true)
        {
          return "כן"
        }
        return "לא"
    }
    $scope.stageRoute = function(id){
           // $scope.bride= $scope.bride;
          console.log(id);
          $location.path('stage/' + id);
    };
    $scope.update = function(bride){
            $scope.upBride = {};
            console.log(bride);
            upBride = {
                created_at : bride.created_at,
                b_id :bride.b_id,
                first_name : bride.first_name,
                last_name :bride.last_name,
                phone1 : bride.phone1,
                phone2 : bride.phone2,
                adress: bride.adress,
                email :bride.email,
                phone1 : bride.phone1,
                phone2 : bride.phone2,
                adress: bride.adress,
                date_event : bride.date_event,
                day_service : bride.day_service,
                price: bride.price,
                remark:bride.remark,
                status:bride.status,
                advertising:bride.advertising
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
                     if($scope.brideWithDress.dresses[0] == undefined && $scope.brideWithDress.status == "פעיל"  ){
                     console.log($scope.brideWithDress.dress);
                     
                    // update status ממתין
                                  $scope.upBride = {};
                                  upBride = {
                                      status:'ממתין'
                                  };
                                  $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
                                    console.log(res);
                                     getOneBride(); 
                                  },function(err){
                                    console.log(err);
                                  })
                   }    
                  else if($scope.brideWithDress.dresses[0] != undefined && $scope.brideWithDress.status == "ממתין" ){ 

                     // update status פעיל
                                  $scope.upBride = {};
                                  upBride = {
                                      status:'פעיל'
                                  };
                                  $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
                                    console.log(res);
                                     getOneBride(); 
                                  },function(err){
                                    console.log(err);
                                  })
                    }

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
                              updateStatus();       
                              getOneBride();
                              swal({
                                    title: 'נוספה שמלה בהצלחה!',
                                    text: '',
                                    timer: 2000
                                  }).then(
                                    function () {},
                                    // handling the promise rejection
                                    function (dismiss) {
                                      if (dismiss === 'timer') {
                                        console.log('I was closed by the timer')
                                      }
                                    }
                                  )
                          }, function(err) {
                            swal({
                                  title: 'נכשל',
                                  html: $('<div>')
                                    .addClass('some-class')
                                    .text('הוספת שמלה נכשלה.'),
                                  animation: false,
                                  customClass: 'animated tada'
                                })
                        })
                    }, function(err) {
                      console.log(err);
                  })
            }, function(err) {
                console.log(err);
            })
     };
     updateStatus = function(){
            
            $scope.upBride = {};
            upBride = {
                status:'פעיל'
            };
            $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
              console.log(res);
            },function(err){
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
                swal({
                      title: 'האם אתה בטוח?',
                      text: "לא יהיה אפשר לשחזר את הרשומה!",
                      type: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'כן , מחק!',
                      cancelButtonText: 'לא , בטל!',
                      confirmButtonClass: 'btn btn-success',
                      cancelButtonClass: 'btn btn-danger',
                      buttonsStyling: false
                     }).then(function () {
                     $http.delete('/api/dresses/'+ $scope.tempid +'/'+ id ).then(function(res) { 
                        $http.delete('/api/dresses/'+id ).then(function(res) {
                                    $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                                          $scope.brideWithDress = res.data; 
                                          if($scope.brideWithDress == undefined){
                                                    updateStatus = function(){
                                                          $scope.upBride = {};
                                                          upBride = {
                                                              status:'ממתין'
                                                          };
                                                          $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
                                                            console.log(res);
                                                          },function(err){
                                                            console.log(err);
                                                          }) 
                                                  };
                                          }
                                          getOneBride();
                                        },function(err) {
                                    });
                                    }, function(err) {
                                      console.log(err);
                                  })
                            }, function(err) {
                                console.log(err);
                            })
                      swal(
                        'נמחק!',
                        'הרשומה נמחקה',
                        'success'
                      )
                    }, function (dismiss) {
                      // dismiss can be 'cancel', 'overlay',
                      // 'close', and 'timer'
                      if (dismiss === 'cancel') {
                        swal(
                          'בוטל',
                          'הרשומה לא נמחקה :)',
                          'error'
                        )
                      }
                    }) 

     };

     $scope.addPayment = function(Payment){ 
       
        $http.post('/api/payments', Payment ).then(function(res) {
              //  $scope.allPayments = $scope.newPayment.pay;

               $http.put('/api/payments/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                        $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            $scope.brideWithPayment = res.data;
                           
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
                }
                ,function(err){
                  console.log(err);
                }) ;
                
     };

     $scope.paymentModify = function(newPayment){
				$scope.paymentModifyField = true;
				$scope.paymentViewField = true;
			};

      $scope.dressModify = function(newDress){
				$scope.dressModifyField = true;
				$scope.dressViewField = true;
			};

      $scope.dressInfoRoute = function(id){  
          $scope.brideid = $route.current.params.brideid;
          console.log(id);
          $location.path('dressInfo/' + $scope.brideid + '/' + id );
      };
    init();
  });


