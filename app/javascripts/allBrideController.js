 angular.module('mainApp');
  app.controller('allBrideController', function($rootScope ,$scope , brideService, $http, $location, $q) {
      var brides;
    
    init = function(){
      getAllBrides();
    }


    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    getAllBrides = function(){ 
       brides = brideService.query();
       $scope.brides = brides;
       console.log( $scope.brides);
       $scope.pageSize = 5 ;
       $scope.data = $scope.brides;
    }
   
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
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
                                                        getOneBride(id);

                        //   $http.get('/api/brideOne/' + id).then(function(res){
                        //   var bride = res.data;
                        //   while(bride.payments == null && bride.dresses == null && bride.stages == null && bride.sizes == null)
                        //   {   
                        //     alert("while")
                        //       getOneBride(id);
                        //       brideService.delete({id:id});
                        //       getAllBrides();
                        //   }
                        //   console.log(bride);
                        // },function(err) {
                        //   console.log(err);
                        // });

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
     

        console.log(bride);
      },function(err) {
         console.log(err);
      });
  }
    delDress = function(bride_id,dresses){
          var bridePromises = [];
          var dressPromises = [];

          for(var i = 0; i < dresses.length; i++) {

            var dresses_id = dresses[i];

            var brideUpdatePromise = $http.delete('/api/dresses/'+ bride_id +'/'+ dresses_id );
            var dressRemovePromise = $http.delete('/api/dresses/'+ dresses_id );
            
            bridePromises.push(brideUpdatePromise);
            dressPromises.push(dressRemovePromise);
            
          }

          $q.all(bridePromises).then(function(res){
            console.log("success all brides dresses removed");
                        brideService.delete({id:id});

            console.log(res);
          });

           $q.all(dressPromises).then(function(res){
            console.log("success all dresses feleted");
            console.log(res);
          });
  }
    delSizes = function(bride_id,sizes){
      var bridePromises = [];
      var sizePromises = [];
      
      for(var i=0; i< sizes.length; i++) {
          var size_id = sizes[i];

          var brideUpdatePromise = $http.delete('/api/sizes/'+ bride_id +'/'+ size_id );
          var sizeRemovePromise = $http.delete('/api/sizes/'+size_id );
          
          bridePromises.push(brideUpdatePromise);
          sizePromises.push(sizeRemovePromise);
      }

      $q.all(bridePromises).then(function(res){
        console.log("success all brides sizes removed");
        console.log(res);
      });

        $q.all(sizePromises).then(function(res){
        console.log("success all sizes deleted");
        console.log(res);
      });
    }

    delStages = function(bride_id,stages){
      var bridePromises = [];
      var stagePromises = [];
      
      for(var i=0; i< stages.length; i++) {
          var stage_id = stages[i];

          var brideUpdatePromise = $http.delete('/api/stages/'+ bride_id +'/'+ stage_id );
          var stageRemovePromise = $http.delete('/api/stages/'+stage_id );
          
          bridePromises.push(brideUpdatePromise);
          stagePromises.push(stageRemovePromise);
      }
      
      $q.all(bridePromises).then(function(res){
        console.log("success all brides stages removed");
        console.log(res);
      });

      $q.all(stagePromises).then(function(res){
        console.log("success all stages deleted");
        console.log(res);
      });
    }


    delPayments = function(bride_id,payments){  

      var bridePromises = [];
      var paymentPromises = [];

      for(var i=0; i< payments.length; i++) {
          var payments_id = payments[i];

          var brideUpdatePromise = $http.delete('/api/payments/'+ bride_id +'/'+ payments_id );
          var paymentRemovePromise = $http.delete('/api/payments/'+ payments_id );
          
          bridePromises.push(brideUpdatePromise);
          paymentPromises.push(paymentRemovePromise);
      }
      
      $q.all(bridePromises).then(function(res){
        console.log("success all brides payments removed");
        console.log(res);
      });

      $q.all(paymentPromises).then(function(res){
        console.log("success all payments deleted");
        console.log(res);
      });
    };
    
    // $(document).ready(function() {
    //     $('#mytable').DataTable();
    // } );

  });