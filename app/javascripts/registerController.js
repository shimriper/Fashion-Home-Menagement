
angular.module('mainApp');

app.controller('registerController', function($scope , $rootScope ,$timeout ,$http, $location ,localStorageService , authService , $localStorage ){
	//$scope.user = {username: '', password: '' ,role:null};
	//$scope.error_message = '';

  //  $scope.user = {role:1  ,password:null , username:null};

	$scope.register = function(){

		authService.register($scope.user).then(function(res){
			console.log('register from service');
			console.log(res);

             if(res.status == 200){

				var data = res.data;
                //$localStorage.user =  {username:data.user.username , role:data.user.role , token:data.user.password};

			}
			else{
				alert(' לא הצליח להוסיף משתמש חדש')
			}
		})
		
	};
});