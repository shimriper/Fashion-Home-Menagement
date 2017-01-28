  angular.module('mainApp');
   app.controller('brideInfoController', function($scope , brideService ,$route , $http , $q) {
     init = function(){
          getOneBride(); 
     };
     	$scope.modify = function(bride){
				$scope.modifyField = true;
				$scope.viewField = true;
			};
		
    $scope.update = function(bride){
            $scope.upBride = {};
            console.log('----updateBride----');
            console.log(bride);
            upBride = {
                created_at : bride.created_at,
                b_id :bride.b_id,
                first_name : bride.first_name,
                last_name :bride.last_name,
                email :bride.email,
                phone1 : bride.phone1,
                phone2 : bride.phone2,
                adress: bride.adress,
                date_event : bride.date_event,
                dress_type: bride.dress_type,
                dress_type2 :bride.dress_type2,
                day_service : bride.day_service,
                price: bride.price,
                remark:bride.remark
            };
            $http.put('/api/bride/update' , {id:$scope.tempid , updatedObj:upBride}).then(function(res){
              	$scope.modifyField = false;
			        	$scope.viewField = false;
              console.log(res);
            },function(err){
              console.log(err);
            }) 

     };
      // get() returns a single bride
     getOneBride = function(){
         $scope.tempid = $route.current.params.brideid;
         $scope.bride = brideService.get({id: $scope.tempid});
         console.log($scope.bride );
         //get payment 
         $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            console.log(res);
                            $scope.brideWithPayment = res.data;
                          }, function(err) {
                            console.log(err);
                        })
     };

     $scope.addPayment = function(Payment){
       console.log('-----addPayment-----');
       console.log(Payment);

        $http.post('/api/payments', $scope.newPayment ).then(function(res) {
               console.log(res.data._id);
               $http.put('/api/payments/'+ $scope.tempid +'/'+ res.data._id ).then(function(res) {
                        $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            console.log(res);
                            $scope.brideWithPayment = res.data;
                          }, function(err) {
                            console.log(err);
                        })
                    }, function(err) {
                      console.log(err);
                  })
            }, function(err) {
                console.log(err);
            })
     };
     $scope.delPayment=function(id){
		    alert('del');
        paymentService.delete({id:id}).then(function(res) {
                         console.log('success delete');
                         //get payment 
                         $http.get('/api/brides/'+ $scope.tempid ).then(function(res) {
                            console.log(res);
                            $scope.brideWithPayment = res.data;
                        },
                        function(err) {
                            console.log(err);
                            })
           
                          }, function(err) {
                            console.log(err);
                        });
     }


    init();
  });


