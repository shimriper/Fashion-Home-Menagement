
angular.module('mainApp');

app.controller('stageController' ,function($scope ,$rootScope, brideService ,$route , $http , $q ,$location,$window){
    
    $scope.tempid = $route.current.params.brideid;

        
        $http.get('/api/bridesizes/'+ tempid).then(function(res) {
                            console.log(res);
                            if(res.data.sizes[0] == null)
                            {
                                $scope.isFull = false;
                            }
                            else
                            {
                                $scope.isFull = false;
                            }
                   
         }, function(err) {
            console.log(err);
           });
        // 9999999999999999999999999
 $scope.dressInfoRoute = function(id){  

          if($scope.brideid)
          $scope.brideid = $route.current.params.brideid;
          console.log(id);
          $location.path('dressInfo/' + $scope.brideid + '/' + id );
      };
});