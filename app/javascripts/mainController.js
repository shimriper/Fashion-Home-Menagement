
angular.module('mainApp');
app.controller('mainController', function($rootScope ,$scope , postService){
	$scope.posts = postService.query();
	$scope.newPost = {created_by: '', text: '', created_at: ''};

	
	$scope.post = function(){
		$scope.newPost.created_by = $rootScope.current_user;
		$scope.newPost.created_at = Date.now();

		postService.save($scope.newPost, function(){
			$scope.posts = postService.query();
			$scope.newPost = {created_by: '', text: '' , created_at: ''};
		});
	};
	$scope.delPost = function(id){
                   postService.delete({id:id});
                   $scope.posts = postService.query();
				   alert('ההודעה נמחקה');
    };
});
