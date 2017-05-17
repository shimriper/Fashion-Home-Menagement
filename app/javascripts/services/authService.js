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
                    $location.path('login');
                   return null;
                }
		});
        };
         factory.register = function (user) {  
          return $http.post('/auth/signup', user).success(function(data){
                if(data.state == 'success'){
                  return data;
                }
                else 
                {
                    return null;
                }
		    });
        };
         factory.logout = function (username , password) {         
            $localStorage.user = null;
            $location.path('login');
        };

        factory.getUser = function(){
            if($localStorage.user == null){
                return null;
            }else{
                return $localStorage.user.role;
            }
               
            
        };




        return factory;
    };

    authService.$inject = injectParams;

    angular.module('mainApp').factory('authService', authService);

}());