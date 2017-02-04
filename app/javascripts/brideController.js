  
  angular.module('mainApp');
  app.controller('brideController', function($rootScope ,$scope , brideService, $http, $location) {

    // $scope.bride = function(){
    //   $scope.newBride.created_at = Date.now();
    //   $scope.newBride.status = "פעיל";
    //   brideService.save($scope.newBride, function(){
    //         $scope.brides = brideService.query();
    //              $scope.newBride = {
    //                 created_at :'',
    //                 b_id :'',
    //                 first_name :'',
    //                 last_name :'',
    //                 email :'',
    //                 phone1 :'',
    //                 phone2 :'',
    //                 adress:'',
    //                 date_event :'',
    //                 day_service :'',
    //                 price:'',
    //                 remark:'',
    //                 status:''
    //             };
    //   });
    // };
    $scope.addBride = function(Bride){
        $scope.newBride.created_at = Date.now();
        $scope.newBride.status = 'פעיל';
      $http.post('/api/brides',$scope.newBride).then(function(res){
          alert('ההרשמה הצליחה');
          brideInfoRoute(res.data._id);
      }, function(err) {
                console.log(err);
            });
    };

   brideInfoRoute = function(id){
          console.log(id);
          $location.path('brideInfo/' + id );
    };
  });
        