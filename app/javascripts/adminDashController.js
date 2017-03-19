 angular.module('mainApp');
  app.controller('adminDashController', function($rootScope ,$scope , brideService, $http, $location) {
    init = function(){
      getAllBrides();
    }
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