
angular.module('mainApp');

app.controller('stageController' ,function($scope ,$rootScope, brideService ,$route , $http , $q ,$location,$window){
      $scope.dressInfoRoute = function(id){  
          $scope.brideid = $route.current.params.brideid;
          console.log(id);
          $location.path('dressInfo/' + $scope.brideid + '/' + id );
      };

      $scope.checkStage = function(){

      };
});