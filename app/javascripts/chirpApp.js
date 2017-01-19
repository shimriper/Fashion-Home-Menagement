var app = angular.module('chirpApp', ['ui.router', 'ngResource']);

app.run(function($rootScope, $http){
	$rootScope.authenticated = false;
	$rootScope.current_user = 'geust';

	$rootScope.logout = function(){
		$http.get('/auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = ' ';
		alert('נתראה בפעם הבאה');
		//$location.path('/login');
	};
});

app.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('/login')
		$stateProvider
		//the login display
		.state('login', {
			url:'/login',
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the timeline display
		.state('main', {
			url:'/main',
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the nav display
		.state('home', {
			url:'/home',
			templateUrl: 'home.html',
			//controller: 'load resize'
		})

		//the signup display
		.state('register', {
			url:'/register',
			templateUrl: 'register.html',
			controller: 'authController'
		});
});

app.factory('postService', function($resource){
  return $resource('/api/posts/:id');
});

app.controller('mainController', function($rootScope ,$scope , postService){
	$scope.posts = postService.query();
	$scope.newPost = {created_by: '', text: '', created_at: ''};

	
	$scope.post = function(){
		$scope.newPost.created_by = $rootScope.current_user;
		$scope.newPost.created_at = Date.now();

		postService.save($scope.newPost, function(){
			$scope.posts = postService.query();
			$scope.newPost = {created_by: '', text: '' , created_at: ' '};
		});
	};
});

app.controller('authController', function($scope , $rootScope ,$http, $location){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.username;
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
				$rootScope.current_user = data.username;
				alert('ההרשמה הצליחה! ');
				$location.path('/home');
			}
			else 
			{
				$scope.error_message = data.massage;
			}
		});
	};
});

// apps
