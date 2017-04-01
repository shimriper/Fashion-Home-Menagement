
  angular.module('mainApp');
  app.controller('navController',function($scope , $rootScope , localStorageService ,$location) {


           $scope.isLoggedIn = function(){
              if($rootScope.user != null){
                return true;
              }else{
                return false;
              }
           }

           $scope.logout = function(){

            //$http.get('/auth/signout');
            
            localStorageService.remove("user");
            $rootScope.user = null; 
           
           $location.path('login');

          };
            
  });
