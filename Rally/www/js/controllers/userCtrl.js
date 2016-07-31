function userCtrl($scope, $state,userService, $rootScope, $ionicHistory, $q, $ionicLoading, $http, global, $cordovaGeolocation){

$scope.apidae = function(){
  var query={"apiKey":"lPTLmIuP","projetId":1980,"searchQuery":"chateau","searchFields":"NOM_DESCRIPTION","selectionIds":[43287],"count":20,"first":0,"order":"PERTINENCE","asc":false};
query = angular.toJson(query);

// query= encodeURI(query);
console.log(encodeURI("http://api.apidae-tourisme.com/api/v002/recherche/list-objets-touristiques?query="+query));
  $http.get((encodeURI("http://api.apidae-tourisme.com/api/v002/recherche/list-objets-touristiques?query="+query))).then(function(res){
    console.log(res.data);
    alert(res.data);
  });
};

  var fbLoginSuccess = function(response) {
     if (!response.authResponse){
       fbLoginError("Cannot find the authResponse");
       return;
     }

     var authResponse = response.authResponse;

     getFacebookProfileInfo(authResponse)
     .then(function(profileInfo) {
       // For the purpose of this example I will store user data on local storage
       var data ={
 				userID: profileInfo.id,
 				name: profileInfo.name,
 				email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
       };
       userService.createUser(data).then(function(res){
         $rootScope.user = res.data;
         $ionicLoading.hide();
         $state.go('tab.dash');
       });

     }, function(fail){
       // Fail get profile info
       console.log('profile info fail', fail);
     });
   };

   // This is the fail callback from the login method
   var fbLoginError = function(error){
     console.log('fbLoginError', error);
     $ionicLoading.hide();
   };

   // This method is to get the user profile info from the facebook api
   var getFacebookProfileInfo = function (authResponse) {
     var info = $q.defer();

     facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
       function (response) {
 				console.log(response);
         info.resolve(response);
       },
       function (response) {
 				console.log(response);
         info.reject(response);
       }
     );
     return info.promise;
   };

   //This method is executed when the user press the "Login with facebook" button
   $scope.facebookSignIn = function() {
     facebookConnectPlugin.getLoginStatus(function(success){
       if(success.status === 'connected'){
         alert(success.authResponse.userID);
         // The user is logged in and has authenticated your app, and response.authResponse supplies
         // the user's ID, a valid access token, a signed request, and the time the access token
         // and signed request each expire
         userService.findOne(success.authResponse.userID).then(function(res) {
          $rootScope.user = res.data;
          $rootScope.hideTabs = '';
          $state.go('tab.dash');
      });

     		// Check if we have our user saved

     		if(!user.userID){
 					getFacebookProfileInfo(success.authResponse)
 					.then(function(profileInfo) {
 						// For the purpose of this example I will store user data on local storage
 						UserService.createUser({
 							authResponse: success.authResponse,
 							userID: profileInfo.id,
 							name: profileInfo.name,
 							email: profileInfo.email,
 							picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
 						});

 						$state.go('tab.dash');
 					}, function(fail){
 						// Fail get profile info
 						console.log('profile info fail', fail);
 					});
 				}else{
 					$state.go('tab.dash');
 				}
       } else {
         // If (success.status === 'not_authorized') the user is logged in to Facebook,
 				// but has not authenticated your app
         // Else the person is not logged into Facebook,
 				// so we're not sure if they are logged into this app or not.

 				console.log('getLoginStatus', success.status);

 				$ionicLoading.show({
           template: 'Logging in...'
         });

 				// Ask the permissions you need. You can learn more about
 				// FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
         facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
       }
     });
   };








}
