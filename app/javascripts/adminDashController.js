 angular.module('mainApp');
  app.controller('adminDashController', function($rootScope ,$scope , brideService, $http, $location) {
    init = function(){
      getAllBrides();
    }
<<<<<<< HEAD


=======
>>>>>>> a4fd48b4aaa23ba1211851015a014e2a11c61839
     getAllBrides = function(){ 
       $scope.brides = brideService.query();
     }
    $scope.brideInfoRoute = function(id){
           // $scope.bride= $scope.bride;
          console.log(id);
          $location.path('brideInfo/' + id );
    };
      $scope.delOne = function(id){
                   brideService.delete({id:id});
                   getAllBrides();
                   alert('הכלה נמחקה');
    };
  init();
  });