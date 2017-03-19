 angular.module('mainApp');
  app.controller('allBrideController', function($rootScope ,$scope , brideService, $http, $location) {
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
    $scope.stageRoute = function(id){
           // $scope.bride= $scope.bride;
          console.log(id);
          $location.path('stage/' + id );
    };
      $scope.delOne = function(id){
                   brideService.delete({id:id});
                   getAllBrides();
                   alert('הכלה נמחקה');
    };
  init();
  });