
angular.module('mainApp');
app.controller('mainController', function($rootScope ,$scope , postService,  $http, $location ,$filter){
	 	getBrideWeek = function(){
        alert('rrrrrrrrr');

            var curr = new Date; // get current date
            var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6

            var firstday = new Date(curr.setDate(first)).toUTCString();
            var lastday = new Date(curr.setDate(last)).toUTCString();
                   
            firstday =  $filter('date')(new Date(firstday),'yyyy-MM-dd');
            lastday =  $filter('date')(new Date(lastday),'yyyy-MM-dd');

            $scope.sun = firstday;
            $scope.sat = lastday;
               $http.get('api/brideByDate/' +firstday+'/'+ lastday)
                                .then(function(res){
                                    $scope.bridesWeek = res.data;  
                                     console.log('$scope.bridesWeek')    ; 
                                    console.log($scope.bridesWeek)    ;                                       
                                }), function(err){
                                console.log(err); 
                                };
    }
	$scope.posts = postService.query();
	$scope.newPost = {created_by: '', text: '', created_at: ''};
     init = function(){
         getBrideWeek();
         }   
   
    
	 
	$scope.post = function(){
		$scope.newPost.created_by = $rootScope.name;
		$scope.newPost.created_at = Date.now();

		postService.save($scope.newPost, function(){
			$scope.posts = postService.query();
			$scope.newPost = {created_by: '', text: '' , created_at: ''};
		});
	};
	$scope.delPost = function(id){
                   postService.delete({id:id});	
                   $scope.posts = postService.query();
				   swal(
						'ההודעה נמחקה!',
						'success'
					)

    };
     $scope.brideInfoRoute = function(id){
           // $scope.bride= $scope.bride;
          console.log(id);
          $location.path('brideInfo/' + id );
    };
    $scope.stageRoute = function(id){
           // $scope.bride= $scope.bride;
          console.log(id);
          $location.path('stage/' + id);
    };
     
      init();

    
});

