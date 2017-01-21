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
           // $location.path(path,bride);
             $location.path('brideInfo/' + id );
  };
  init();
  });