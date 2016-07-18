function userCtrl($scope, socket, $state, $rootScope, $ionicHistory, $q, $ionicLoading, $http, global, $cordovaGeolocation){


    var fbLoginSuccess = function(response) {
      if (!response.authResponse) {
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse)
        .then(function(profileInfo) {
          // For the purpose of this example I will store user data on local storage
          var user = {
            password: profileInfo.id,
            name: profileInfo.name,
            email: profileInfo.email,
            music: profileInfo.music,
            interests: profileInfo.likes,
            books: profileInfo.books,
            places: profileInfo.tagged_places,
            picture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"


          };
          var options = {
            timeout: 10000,
            enableHighAccuracy: true
          };
          $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
            user.LatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            $rootScope.user = user;

            loginService.create(user).then(function(res) {
              //EMIT SOCKET NEW USER ><<<>><<<<><<<><<><<<<<><>><<<<<<<<<><<<>><><><<<>><<<<><<<><<><<<<<><>><<<<<<<<<><<<>><><
              socket.emit('newUser', {
                user: $scope.user.name
              }, function() {
                console.log($scope.user);
              });

              $scope.user = res.data;
              //add calendar to this personvar data = {};
              calendar = {
                date: []
              };

              $http.post('http://' + global.host + ':' + global.port + '/calendars', calendar).then(function(res) {
                var calendarID = res.data._id;
                var data =   {
                  id_calendar: calendarID
                };
                profileService.addCalendar($scope.user._id, data).then(function(res) {
                  loginService.findOne($scope.user.password).then(function(res){
                    $rootScope.user = res.data;
                    $rootScope.hideTabs = '';
                    $state.go('tab.main');
                  });

                });
              });
            });

            // $ionicLoading.hide();
            // $rootScope.hideTabs = '';
            // $state.go('tab.main');

          });



        }, function(fail) {
          // Fail get profile info
        });
    };

    // This is the fail callback from the login method
    var fbLoginError = function(error) {
      $ionicLoading.hide();
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function(authResponse) {
      var info = $q.defer();

      facebookConnectPlugin.api('/me?fields=email,name,likes,music,tagged_places&access_token=' + authResponse.accessToken, null,
        function(response) {
          info.resolve(response);
        },
        function(response) {
          info.reject(response);
        }
      );
      return info.promise;
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function() {
      facebookConnectPlugin.getLoginStatus(function(success) {
        if (success.status === 'connected') {


          loginService.findOne(success.authResponse.userID).then(function(res) {
            $rootScope.user = res.data;
            // var options = {
            //   timeout: 10000,
            //   enableHighAccuracy: true
            // };
            // $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
            //   $rootScope.user.LatLng = {
            //     lat: position.coords.latitude,
            //     lng: position.coords.longitude
            //   };
            //   loginService.update($rootScope.user._id, $rootScope.user).then(function(res) {
            //     $rootScope.user = res.data;
            //
            //   });
              $rootScope.hideTabs = '';
              $state.go('tab.main');

            // });
          });
          if (!user.userID) {
            getFacebookProfileInfo(success.authResponse)
              .then(function(profileInfo) {}, function(fail) {
                // Fail get profile info
                console.log('profile info fail', fail);
              });
          } else {
            $state.go('tab.main');
          }
        } else {

          console.log('getLoginStatus', success.status);
          //
          // $ionicLoading.show({
          //   template: 'Logging in...'
          // });
          facebookConnectPlugin.login(['email', 'public_profile', 'user_likes'], fbLoginSuccess, fbLoginError);
        }
      });






    };









}
