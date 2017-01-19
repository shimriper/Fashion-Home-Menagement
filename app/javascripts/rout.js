angular.module('mainApp')
.config(function($stateProvider){
		$stateProvider
		//the timeline display
		.state('main', {
			url:'/main',
			templateUrl: 'main.html',
			controller: 'mainController'
		});
});
