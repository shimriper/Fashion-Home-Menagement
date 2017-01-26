
angular.module('mainApp');

app.controller('authController', function($scope , $rootScope ,$http, $location){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				alert('עבודה נעימה');
				$location.path('/home');
			}
			else
			{
				console.log('the username or password invalid');
				alert('שם משתמש/סיסמא אינם נכונים');
				$scope.error_message = data.massage;
			}
			
		});
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				alert('ההרשמה הצליחה! ');
				$location.path('/home');
			}
			else 
			{
				console.log('faild');
				$scope.error_message = data.massage;
			}
		});
	};
});