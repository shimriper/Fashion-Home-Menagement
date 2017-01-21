  
  angular.module('mainApp');
  app.controller('brideController', function($rootScope ,$scope , brideService, $http, $location) {
    
    $scope.brides = brideService.query();
    
    $scope.newBride = {
            created_at :'',
            b_id :'',
            first_name :'',
            last_name :'',
            email :'',
            phone1 :'',
            phone2 :'',
            adress:'',
            date_event :'',
            dress_type:'',
            dress_type2 :'',
            day_service :'',
            price :'',
            remark:''
    };

    $scope.bride = function(){
      $scope.newBride.created_at = Date.now();
      brideService.save($scope.newBride, function(){
            $scope.brides = brideService.query();
            $scope.newBride = {
            created_at :'',
            b_id :'',
            first_name :'',
            last_name :'',
            email :'',
            phone1 :'',
            phone2 :'',
            adress:'',
            date_event :'',
            dress_type:'',
            dress_type2 :'',
            day_service :'',
            price :'',
            remark:''
        };
      });
    };

  }
  );

  
