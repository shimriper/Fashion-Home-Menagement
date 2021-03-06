 angular.module('mainApp');
  app.controller('allBrideController', function($rootScope ,$scope , brideService, $http, $location, $q ,$filter) {
      var brides = [];
      var brideOn= [];
      var brideClose = [];
      var brideWait= [];
     
     $scope.filterDate = false;
    init = function(){
      
      getAllB();
      // getBridesByStatus(status);
    }


    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    getAllB = function(){
          $http.get('api/brides')
          .then(function(res){
              brides = res.data;
              $scope.brides = brides;
              if(brides.length == 0){
                swal('אין נתונים');
              }
          }), function(err){
          console.log(err); 
          };
          $scope.brides = brides;
          //  console.log( $scope.brides);
           $scope.pageSize = 5 ;
           $scope.data = $scope.brides;
           $scope.brideByDate;
    }
    getAllBrides = function(){    
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); 
              
             firstDay =  $filter('date')(new Date(firstDay),'yyyy-MM-dd');
            lastDay =  $filter('date')(new Date(lastDay),'yyyy-MM-dd');

            var status = "פעיל";

            $http.get('api/brideByDateStatus/' +firstDay+'/'+ lastDay + '/' + status)
                    .then(function(res){
                         brides = res.data;
                         $scope.brides = brides;
                       
                         if(brides.length == 0){
                           swal('אין נתונים');
                         }
                    }), function(err){
                    console.log(err); 
                    };
      //  brides = brideService.query();
        $scope.brides = brides;
      //  console.log( $scope.brides);
       $scope.pageSize = 5 ;
       $scope.data = $scope.brides;
       $scope.brideByDate;
    
    }
   
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.brideInfoRoute = function(id){
           // $scope.bride= $scope.bride;
          // console.log(id);
          $location.path('brideInfo/' + id );
    };
    $scope.stageRoute = function(id){
           // $scope.bride= $scope.bride;
          // console.log(id);
          $location.path('stage/' + id);
    };
      $scope.delOne = function(id){

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
                        getOneBride(id);
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
     $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
             	   swal(
                        'המסמך ירד בהצלחה!',
                        'Report.xls'
                      )
    };
  init();
    $scope.unFilter = function(){
        $scope.filterDate = false;
        getAllBrides();
    }
$scope.getBrdideByDate = function(startDate,endDate ,status){
  if(startDate == null ||endDate == null || status == null ){
    $scope.filterDate = false;
    swal('בבקשה מלא מסנן');
  }
  else if(status == "הכל" && startDate !=null && endDate != null){
     $http.get('api/brideByDate/' +startDate+'/'+ endDate)
              .then(function(res){
                $scope.filterDate = true;
                var brideByDate = res.data;
                brides = brideByDate;
                // console.log(brideByDate); 
                $scope.brideByDate = brideByDate;       
              }), function(err){
              console.log(err); 
              };
  }
  else{

      startDate =  $filter('date')(new Date(startDate),'yyyy-MM-dd');
      endDate =  $filter('date')(new Date(endDate),'yyyy-MM-dd')
      
      $http.get('api/brideByDateStatus/' +startDate+'/'+ endDate + '/' + status)
              .then(function(res){
                $scope.filterDate = true;
                var brideByDate = res.data;
                brides = brideByDate;
                // console.log(brideByDate); 
                $scope.brideByDate = brideByDate;       
              }), function(err){
              console.log(err); 
              };
  }
}

getOneBride = function(id){
      $http.get('/api/brideOne/' + id).then(function(res){

        var bride = res.data;
  
        if(bride.dresses.length == 0 && bride.sizes.length ==0 && bride.stages.length ==0 && bride.payments.length == 0 ){
             brideService.delete({id:id}).then(function(res,err){
                        if(err){
                          console.log("err");
                        }else{
                         
                          getAllBrides();
                        }
                      });
          
        }
        else{
                delDress(id,bride.dresses);
                delSizes(id,bride.sizes);
                delStages(id,bride.stages);
                delPayments(id,bride.payments);
                if(bride.dresses.length == 0 && bride.sizes.length ==0 && bride.stages.length ==0 && bride.payments.length == 0 ){
                      brideService.delete({id:id}).then(function(res,err){
                        if(err){
                          console.log("err");
                        }else{
                         
                          getAllBrides();
                        }
                      });
                }
        }
         getAllBrides();

        // console.log(bride);
      },function(err) {
          console.log(err);
      });
  }
    delDress = function(bride_id,dresses){
          var bridePromises = [];
          var dressPromises = [];
          if(dresses.length == 0){
            return
          }
          else{
              for(var i = 0; i < dresses.length; i++) {

                var dresses_id = dresses[i];

                var brideUpdatePromise = $http.delete('/api/dresses/'+ bride_id +'/'+ dresses_id );
                var dressRemovePromise = $http.delete('/api/dresses/'+ dresses_id );
                
                bridePromises.push(brideUpdatePromise);
                dressPromises.push(dressRemovePromise);
                
              }

              $q.all(bridePromises).then(function(res){
                console.log("success all brides dresses removed");
                            // brideService.delete({id:id});

                console.log(res);
              });

              $q.all(dressPromises).then(function(res){
                console.log("success all dresses feleted");
                console.log(res);
              });
            }
  }
    delSizes = function(bride_id,sizes){
      var bridePromises = [];
      var sizePromises = [];
      if(sizes.length == 0){
          return;
      }
      else{
        for(var i=0; i< sizes.length; i++) {
            var size_id = sizes[i];

            var brideUpdatePromise = $http.delete('/api/sizes/'+ bride_id +'/'+ size_id );
            var sizeRemovePromise = $http.delete('/api/sizes/'+size_id );
            
            bridePromises.push(brideUpdatePromise);
            sizePromises.push(sizeRemovePromise);
        }

        $q.all(bridePromises).then(function(res){
          // console.log("success all brides sizes removed");
          // console.log(res);
        });

          $q.all(sizePromises).then(function(res){
          // console.log("success all sizes deleted");
          // console.log(res);
        });
      }
    }

    delStages = function(bride_id,stages){
      var bridePromises = [];
      var stagePromises = [];
      if(stages.length == 0){
        return;
      }
      else{
          for(var i=0; i< stages.length; i++) {
              var stage_id = stages[i];

              var brideUpdatePromise = $http.delete('/api/stages/'+ bride_id +'/'+ stage_id );
              var stageRemovePromise = $http.delete('/api/stages/'+stage_id );
              
              bridePromises.push(brideUpdatePromise);
              stagePromises.push(stageRemovePromise);
          }
          
          $q.all(bridePromises).then(function(res){
            // console.log("success all brides stages removed");
            // console.log(res);
          });

          $q.all(stagePromises).then(function(res){
            // console.log("success all stages deleted");
            // console.log(res);
          });
      }
    }


    delPayments = function(bride_id,payments){  

      var bridePromises = [];
      var paymentPromises = [];
      if(payments.length == 0){
          return;
      }else{
            for(var i=0; i< payments.length; i++) {
                var payments_id = payments[i];

                var brideUpdatePromise = $http.delete('/api/payments/'+ bride_id +'/'+ payments_id );
                var paymentRemovePromise = $http.delete('/api/payments/'+ payments_id );
                
                bridePromises.push(brideUpdatePromise);
                paymentPromises.push(paymentRemovePromise);
            }
            
            $q.all(bridePromises).then(function(res){
              // console.log("success all brides payments removed");
              // console.log(res);
            });

            $q.all(paymentPromises).then(function(res){
              // console.log("success all payments deleted");
              // console.log(res);
            });
          };
    }

  });