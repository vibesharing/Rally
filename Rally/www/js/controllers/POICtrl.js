function POICtrl($rootScope, $scope, $state, $stateParams, parcourService, $cordovaGeolocation, $http, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaCapture, $cordovaMedia) {
  $scope.step = 0;
  $scope.POI = {};


  //Step 0




  //Step 1
  var styles = [{
    stylers: [{
      hue: "#00ffe6"
    }, {
      saturation: -20
    }]
  }, {
    featureType: "road",
    elementType: "geometry",
    stylers: [{
      lightness: 100
    }, {
      visibility: "simplified"
    }]
  }, {
    featureType: "road",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  }];

  var styledMap = new google.maps.StyledMapType(styles, {
    name: "Styled Map"
  });
  //=========================================
  $scope.search = function() {
    console.log('hello');
    console.log(encodeURI($scope.POI.geolocation));
    $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI($scope.POI.geolocation) + "&key=AIzaSyC-GzyChDC5815KUYMytd7OWcWA94iFKGY").then(function(res) {
      console.log(res);
      console.log(res.data.results[0].geometry.location);
      var coordinates = new google.maps.LatLng(res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng);

      marker(coordinates);
    });
  };
  $scope.searchWithPosition = function() {
    var posOptions = {
      timeout: 10000,
      enableHighAccuracy: false
    };
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(position.coords);
        var coordinates = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        marker(coordinates);
      }, function(err) {
        // error
      });
  };

  var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      console.log($scope.map);
    }, function(error){
      console.log("Could not get location");
    });


function marker(latLng){
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      $scope.map.center = latLng;
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });

    });
}
  //Step 2  Pictures
  function getPicture(options) {
    $cordovaCamera.getPicture(options).then(function(imageData) {
      onImageSuccess(imageData);

      function onImageSuccess(fileURI) {
        createFileEntry(fileURI);
      }

      function createFileEntry(fileURI) {
        window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
      }

      function copyFile(fileEntry) {
        var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
        var newName = makeid() + name;
        newName = $scope.user._id + '.jpg';

        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
            fileEntry.copyTo(
              fileSystem2,
              newName,
              onCopySuccess,
              fail
            );
          },
          fail);
      }

      // function onCopySuccess(entry) {
      //   $scope.$apply(function() {
      //     $scope.images = [];
      //     $scope.images.push(entry.nativeURL);
      //     var opt = {};
      //     opt.fileName = entry.nativeURL.substr(entry.nativeURL.lastIndexOf('/') + 1);
      //     $cordovaFileTransfer.upload('http://192.168.3.196:8000/upload', entry.nativeURL, opt).then(function(res) {
      //       changeProfileImage();
      //     }, function(err) {
      //       //Error
      //       alert(JSON.stringify(err));
      //     })
      //   });
      // }

      function fail(error) {
        console.log("fail: " + error.code);
      }

      function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }

    }, function(err) {
      console.log(err);
    });
  }

  $scope.addImage = function() {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY, // Camera.PictureSourceType.PHOTOLIBRARY
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 400,
      targetHeight: 400,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      cameraDirection: 1,
    };

    getPicture(options);
  };

  $scope.takePicture = function() {

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      targetWidth: 400,
      targetHeight: 400,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    getPicture(options);
  };



  //Step 3

  $scope.captureAudio = function() {
     var options = { limit: 3, duration: 10 };

     $cordovaCapture.captureAudio(options).then(function(audioData) {
console.log('yes');
     }, function(err) {
       // An error occurred. Show a message to the user
     });
   };




  //Step 4





}
