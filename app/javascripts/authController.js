
angular.module('mainApp');

app.controller('authController', function($scope , $rootScope ,$timeout ,$http, $location ,localStorageService ){
	$scope.user = {username: '', password: '' ,role:null};
	$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$http.get('/auth/success').success(function(data){
				})
				.error(function(err){
					console.log(err);
				})
				
				
				
				
				//$rootScope.authenticated = true;
				//$rootScope.current_user = data.user.username;
				localStorageService.set("user", {name:data.user.username , role:'admin'});  
				$timeout(function(){
					$location.path('/main');
				},10)
				
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
				$location.path('/main');
			}
			else 
			{
				console.log('faild');
				$scope.error_message = data.massage;
			}
		});
	};
});