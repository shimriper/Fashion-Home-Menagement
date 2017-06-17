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
     }
    $scope.brideInfoRoute = function(id){
           // $scope.bride= $scope.bride;
          console.log(id);
          $location.path('brideInfo/' + id );
    };
    $scope.stageRoute = function(id){
           // $scope.bride= $scope.bride;
          console.log(id);
          $location.path('stage/' + id );
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
                          brideService.delete({id:id});
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
  });