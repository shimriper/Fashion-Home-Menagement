
angular.module('mainApp');

app.controller('loginController', function($scope , $rootScope ,$timeout ,$http, $location ,localStorageService ,$localStorage, authService ){
	//$scope.user = {username: '', password: '' ,role:null};
	//$scope.error_message = '';

	$scope.login = function(){		
		authService.login($scope.user).then(function(res){
			console.log('login from service');
			console.log(res);
			if(res.status == 200){

				if(res.data == null || res.data.user == null){

					console.log('error!!!');
				}else{
					var data = res.data;
				$localStorage.user =  {username:data.user.username , role:data.user.role , token:data.user.password};
				$location.path('main');
				}
				
			}
			else{

				$location.path('login');
			}

			
		})
	};
	
});