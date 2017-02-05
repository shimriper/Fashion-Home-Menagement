  
  angular.module('mainApp');


  app.controller('brideController', function($rootScope ,$scope , brideService, $http, $location) {
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

