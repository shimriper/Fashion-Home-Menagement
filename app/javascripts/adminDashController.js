 angular.module('mainApp');
  app.controller('adminDashController', function($rootScope ,$scope , brideService, $http, $location) {
    init = function(){
      $scope.getBrideDona = function(){

       $scope.brides = brideService.query();
      
        $scope.labels = ["כלה", "שמלות ערב"];
        $scope.data = [300, 500];
    }
    }

  init();
});

