  
  angular.module('mainApp');
  
  
  app.controller('brideController', function($rootScope ,$scope , brideService) {
    $scope.bride = brideService.query();
    $scope.newBride = {
      first_name: '',
      last_name: '',
      created_at: '',
      email: '',
      phone1: '',
      phone2: '',
      adress: '',
      dress_type: '',
      date_event: '',
      day_service: '',
      remark:'',
    };

    $scope.bride = function(){
      // $scope.newBride.first_name = $rootScope.first_name;
      // $scope.newBride.last_name = $rootScope.last_name;
      $scope.newBride.created_at = Date.now();
      // $scope.newBride.email = $rootScope.email;
      // $scope.newBride.phone1 = $rootScope.phone1;
      // $scope.newBride.phone2 = $rootScope.phone2;
      // $scope.newBride.adress = $rootScope.adress;
      // $scope.newBride.dress_type = $rootScope.dress_type;
      // $scope.newBride.date_event = $rootScope.date_event;
      // $scope.newBride.day_service = $rootScope.day_service;
      // $scope.newBride.remark = $rootScope.remark;

      brideService.save($scope.newBride, function(){
        $scope.brides = brideService.query();
        $scope.newBride = {
            first_name: '',
            last_name: '',
            created_at: '',
            email: '',
            phone1: '',
            phone2: '',
            adress: '',
            dress_type: '',
            date_event: '',
            day_service: '',
            remark:'',
        };
      });
    };
  });

  
