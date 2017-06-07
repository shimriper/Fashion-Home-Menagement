var app = angular.module('mainApp', [
	'ngRoute',
	'ngResource',
	'ngMaterial',
	'ngMessages',
	'LocalStorageModule',
	'ngStorage',
	'chart.js',
]);

 

app.config(function($routeProvider){

	$routeProvider
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'loginController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'registerController'

		})
		
		.when('/bride', {
			templateUrl: 'bride.html',
			controller: 'brideController',
			secure: true
		})
		
		.when('/brideInfo/:brideid', {
			templateUrl: 'brideInfo.html',
			controller: 'brideInfoController',
			secure: true
		})
	
		.when('/allBrides', {
			templateUrl: 'allBrides.html',
			controller:  'allBrideController',
			secure: true
		})
		//the timeline display
		.when('/main', {
			templateUrl: 'main.html',
			controller: 'mainController',
			secure: true
		})
		//the timeline display
		.when('/payment', {
			templateUrl: 'payment.html',
			controller: 'paymentController',
			secure: true

		})
		//the dressInfo display
		.when('/dressInfo/:brideid/:dressid', {
			templateUrl: 'dressInfo.html',
			controller: 'dressInfoController',
			secure: true
		})
		//the adminDash display
		.when('/adminDash', {
			templateUrl: 'adminDash.html',
			controller: 'adminDashController',
			secure: true
		})
		//the stage display
		.when('/stage/:brideid', {
			templateUrl: 'stage.html',
			controller: 'stageController',
			secure: true
		})
		
		.otherwise({ redirectTo: '/login' });



});

 app.run(['$rootScope', '$location', '$timeout', '$window','$localStorage',
   function ($rootScope, $location, $timeout, $window , $localStorage) {

       //own security as well since client-based security is easily hacked
       $rootScope.$on("$routeChangeStart", function (event, next, current) {

			var user = $localStorage.user;

			//console.log(user);
           if (next && next.$$route) {

			   if(next.$$route.secure){
				   
					if (user == null) {
						console.log(user);
						console.log('secure route change failed');
						$location.path('login');
					}

					console.log('secure route change success');
               }

		
					   
           }else{
				console.log(' route change failed');
				$location.path('login');
		   }  
       });

   }]);
// apps
