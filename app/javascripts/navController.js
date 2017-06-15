
  angular.module('mainApp');
  app.controller('navController',function($scope , $rootScope , $localStorage ,$location , authService) {
          
        
          function role(){
              var role = authService.getUser();
              if( role == null)
              {
                $scope.user_role = -1;
              }else{
                 $scope.user_role = role;
                  // alert('user_role' + $scope.user_role)
              }
            
          }
           $scope.isLoggedIn = function(){
              
              if($localStorage.user == null){
                  $location.path('login');
                  return false;
              }else{
                $scope.name = $localStorage.user.username;
                role();
                return true;
              }
           }
           $scope.logout = function(){

                authService.logout();

          };



          
            
   });