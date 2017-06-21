 angular.module('mainApp');
  app.controller('allBrideController', function($rootScope ,$scope , brideService, $http, $location) {
    init = function(){
      getAllBrides();
                     

    }
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
     getAllBrides = function(){ 
       $scope.brides = brideService.query();
        

       console.log( $scope.brides);
     }
    $scope.brideInfoRoute = function(id){
           // $scope.bride= $scope.bride;
          console.log(id);
          $location.path('brideInfo/' + id );
    };
    $scope.stageRoute = function(id){
           // $scope.bride= $scope.bride;
          console.log(id);
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
                          getOneBride(id); // get one bride and delete all suns
                              getAllBrides();
                    
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

getOneBride = function(id){
      $http.get('/api/brideOne/' + id).then(function(res){
        var bride = res.data;
        delDress(id,bride.dresses);
        delSizes(id,bride.sizes);
        delStages(id,bride.stages);
        delPayments(id,bride.payments);
        getAllBrides();
        brideService.delete({id:id});
        console.log(bride);
      },function(err) {
         console.log(err);
      });
  }
    delDress = function(bride_id,dresses){
        for(var i=0; i< dresses.length; i++)
        {
          var dresses_id = dresses[i];
          $http.delete('/api/dresses/'+ bride_id +'/'+ dresses_id ).then(function(res) { 
                        $http.delete('/api/dresses/'+dresses_id ).then(function(res) {
                                        console.log("success");
                                        },function(err) {
                                    });
                                    }, function(err) {
                                      console.log(err);
                                  });
        }

  }
    delSizes = function(bride_id,sizes){
      for(var i=0; i< sizes.length; i++) {
          var size_id = sizes[i];
          $http.delete('/api/sizes/'+ bride_id +'/'+ size_id ).then(function(res) { 
                        $http.delete('/api/sizes/'+size_id ).then(function(res) {
                                        console.log("success");
                                        },function(err) {
                                    });
                                    }, function(err) {
                                      console.log(err);
                                  });
      }
    }
    delStages = function(bride_id,stages){
      for(var i=0; i< stages.length; i++) {
        var stage_id = stages[i];
       $http.delete('/api/stages/'+ bride_id +'/'+ stage_id ).then(function(res) { 
                        $http.delete('/api/stages/'+stage_id ).then(function(res) {
                                        console.log("success del stages");
                                        },function(err) {
                                    });
                            }, function(err) {
                                console.log(err);
                            });     
      }
    }
    delPayments = function(bride_id,payments){   
           for(var i=0; i< payments.length; i++) {
             var payment_id = payments[i];
              $http.delete('/api/payments/'+ bride_id +'/'+ payment_id ).then(function(res) { 
              $http.delete('/api/payments/'+payment_id ).then(function(res) {
                              console.log("success");
                              },function(err) {
                          });
                  }, function(err) {
                      console.log(err);
                  });
           }    
     };

  });