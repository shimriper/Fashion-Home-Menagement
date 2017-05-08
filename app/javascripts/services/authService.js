(function () {
    var injectParams = ['$localStorage','$location', '$http', '$q',];
    var authService = function ($localStorage, $location, $http, $q) {
        factory = {};
        factory.login = function (user) {
            return $http.post('/auth/login', user ).success(function(data){
			    if(data.state == 'success'){
                    return data;
                }
                else
                {
                    
                   return null;
                }
		});
        };
         factory.register = function (user) {  
          return $http.post('/auth/signup', user).success(function(data){
                if(data.state == 'success'){

                  return data;

                    //$rootScope.authenticated = true;
                    //$rootScope.current_user = data.user.username;
                    //alert('ההרשמה הצליחה! ');
                    //$location.path('/main');
                }
                else 
                {
                    return null;
                }
		    });
        };
          //  $scope.logout = function(){

          //   //$http.get('/auth/signout');
            
          //   localStorageService.remove("user");
          //   $rootScope.user = null; 
           
          //  $location.path('login');

          // };
         factory.logout = function (username , password) {
           
            //$http.get('/auth/signout');
            $localStorage.user = null;
            $location.path('login');
        };

        


        return factory;
    };

    authService.$inject = injectParams;

    angular.module('mainApp').factory('authService', authService);

}());