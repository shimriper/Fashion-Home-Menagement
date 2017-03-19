var app = angular.module('mainApp', [
	'ngRoute',
	'ngResource',
	'ngMaterial',
	'ngMessages'
]);


app.run(function($http, $rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = 'geust';

	$rootScope.logout = function(){
		$http.get('/auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = 'geust';
		alert('נתראה בפעם הבאה');
		//$location.path('/login');

	};
});



app.config(function($routeProvider){

	$routeProvider
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		})
		//the nav display
		.when('/home', {
			templateUrl: 'home.html',
			//controller: 'load resize'
		})
		.when('/bride', {
			templateUrl: 'bride.html',
			controller: 'brideController'
		})
		
		.when('/brideInfo/:brideid', {
			templateUrl: 'brideInfo.html',
			controller: 'brideInfoController'
		})
	
		.when('/allBrides', {
			templateUrl: 'allBrides.html',
			controller:  'allBrideController'
		})
		//the timeline display
		.when('/main', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the timeline display
		.when('/payment', {
			templateUrl: 'payment.html',
			controller: 'paymentController'
		})
		//the dressInfo display
		.when('/dressInfo/:brideid/:dressid', {
			templateUrl: 'dressInfo.html',
			controller: 'dressInfoController'
		})
		//the adminDash display
		.when('/adminDash', {
			templateUrl: 'adminDash.html',
			controller: 'adminDashController'
		})
		//the stage display
		.when('/stage/:brideid', {
			templateUrl: 'stage.html',
			controller: 'stageController'
		})
		
		.otherwise({ redirectTo: '/login' });
});
// apps
