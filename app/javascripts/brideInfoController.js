  angular.module('mainApp');
   app.controller('brideInfoController', function($scope , brideService ,$route) {    
     init = function(){
       getOneBride();
      //  setInfoBride();
     };
     // set() update a single bride
         setInfoBride = function(){ 
              $scope.updateID = $route.current.params.brideid;
              $scope.bride = brideService.put({id: $scope.updateID});
              console.log($scope.bride); 
          }; 
      // get() returns a single bride
     getOneBride = function(){ 
         $scope.tempid = $route.current.params.brideid;
         $scope.bride = brideService.get({id: $scope.tempid});
         console.log($scope.bride ); 
     };
    init();
    setInfoBride();
  });
 app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';

    
  });
  app.controller('editData', function($scope,brideService,$route) {
          $scope.bride;  
  });

