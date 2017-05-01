var app = angular.module('mainApp', [
	'ngRoute',
	'ngResource',
	'ngMaterial',
	'ngMessages',
<<<<<<< HEAD
	'LocalStorageModule',
=======
	'LocalStorageModule'
>>>>>>> a4fd48b4aaa23ba1211851015a014e2a11c61839
]);


 

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

 app.run(['$rootScope', '$location', '$timeout', '$window','localStorageService',
   function ($rootScope, $location, $timeout, $window ,localStorageService) {

       //own security as well since client-based security is easily hacked
       $rootScope.$on("$routeChangeStart", function (event, next, current) {

			var user = localStorageService.get("user");
			console.log(user);
           if (next && next.$$route && next.$$route.secure) {

               if (user == null) {



                   $location.path('login');

               }else{

				   $rootScope.user = user;
			   }

           }else{
				 $location.path('login');
		   }



       });

   }]);
// apps
