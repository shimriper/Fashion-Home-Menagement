(function () {
    var injectParams = ['$localStorage','$location', '$http', '$q',];
    var authService = function ($localStorage, $location, $http, $q) {
        factory = {};
        //when browser closed - psedocode
     
     
        $(window).unload(function(){
                $localStorage.$reset();// reset all sessions
        });
        
        factory.login = function (user) {
            return $http.post('/auth/login', user ).success(function(data){
			    if(data.state == 'success'){
                      swal({
                        title: 'ברוכה הבאה ל F.H.M!',
                        text: 'עבודה נעימה',
                        timer: 2000
                        }).then(
                            function () {},
                            // handling the promise rejection
                            function (dismiss) {
                                if (dismiss === 'timer') {
                                console.log('I was closed by the timer')
                                }
                            }
                        )
                    return data;
                }
                else
                {
                    $location.path('login');
                    swal({
                        title: 'שם משתמש או סיסמא אינם נכונים!',
                        html: $('<div>')
                            .addClass('some-class')
                            .text('בבקשה פנה למנהל'),
                        animation: false,
                        customClass: 'animated tada'
                    })
                   return null;
                }
		});
        };
         factory.register = function (user) {  
          return $http.post('/auth/signup', user).success(function(data){
                if(data.state == 'success'){
                    swal({
                        title: 'הוספת משתמש חדש!',
                        text: 'ההרשמה הצליחה',
                        timer: 2000
                        }).then(
                            function () {},
                            // handling the promise rejection
                            function (dismiss) {
                                if (dismiss === 'timer') {
                                console.log('I was closed by the timer')
                                }
                            }
                        )
                  return data;
                   
                }
                else 
                {
                    $location.path('login');
                    swal({
                        title: 'שם משתמש או סיסמא אינם נכונים!',
                        html: $('<div>')
                            .addClass('some-class')
                            .text('בבקשה פנה למנהל'),
                        animation: false,
                        customClass: 'animated tada'
                        })
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