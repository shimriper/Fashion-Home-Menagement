
angular.module('mainApp');

app.controller('stageController' ,function($scope ,$rootScope, brideService ,$route , $http , $q ,$location,$window){
   init = function(){ 
      checkStage();
      $scope.isDone= function(){
             if($rootScope.brideWithStage.stages[0] != null){
                return true;
             }
             return false;

          }
            $scope.tempid = $route.current.params.brideid;
      };
      $scope.dressInfoRoute = function(id){  
          $scope.brideid = $route.current.params.brideid;
          
      };

    checkStage = function(){
         $scope.tempid = $route.current.params.brideid;
         $http.get('/api/bridestages/'+ $scope.tempid).then(function(res) {
                          $rootScope.bridewithstage = res.data;
                           
                   
         }, function(err) {
            console.log(err);
           });
     };

    
     $scope.forwordStage = function(){
          
          $location.path('brideInfo/' + $scope.tempid );
     };
     init();
});