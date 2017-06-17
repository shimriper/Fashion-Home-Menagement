  
  angular.module('mainApp');


  app.controller('brideController', function($rootScope ,$scope , brideService, $http, $location) {
    $scope.addBride = function(Bride){
        $scope.newBride.created_at = Date.now();
        $scope.newBride.status = 'ממתין';
      $http.post('/api/brides',$scope.newBride).then(function(res){    
            swal(
              'ההרשמה הצליחה!',
              'הלקוחה הוספה!',
              'success'
            )
          
          brideInfoRoute(res.data._id);
      }, function(err) {
                swal(
                  'נכשל!',
                  'שגיאה בהרשמה',
                  'error'
                )
                console.log(err);
            });
    };

     $scope.checkErr = function(eventDate) {
        $scope.errMessage = '';
        var curDate = new Date();
        if(new Date(curDate) >= new Date(eventDate)){
          $scope.errMessage = 'תאריך אירוע עבר/שווה להיום';
          return false;
        }
        else
        {
           $scope.errMessage = 'תאריך אירוע תקין';
          return true;
        }
    };

   brideInfoRoute = function(id){
          console.log(id);
          $location.path('brideInfo/' + id );
    };
  });

