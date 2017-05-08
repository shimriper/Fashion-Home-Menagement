
angular.module('mainApp');

app.controller('stageController' ,function($scope ,$rootScope, brideService ,$route , $http , $q ,$location,$window){
      $scope.dressInfoRoute = function(id){  
          $scope.brideid = $route.current.params.brideid;
          
      };

      $scope.checkStage = function(){

      };
});