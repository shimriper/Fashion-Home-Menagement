  angular.module('mainApp');
   app.controller('brideInfoController', function($scope , brideService ,$route) {
   
    init = function(){
      getBridesById();
    }
            $scope.test = $route.current.params.brideid;

       getBridesById = function(){ 
          $scope.test = brideService.query();
     }
   console.log($route.current.params);
   
   

      init();
  });
