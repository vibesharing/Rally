function mapCtrl($scope,$rootScope, $state ,$stateParams, $http, $cordovaGeolocation, $ionicSlideBoxDelegate) {


  $scope.nextSlide = function() {
     $ionicSlideBoxDelegate.next();
   };
$scope.parcour= $rootScope.parcour;

  var options = {
    timeout: 10000,
    enableHighAccuracy: true
  };
  console.log($rootScope.parcour);
   $cordovaGeolocation.getCurrentPosition(options).then(function(position){

     var latLng = position;
  //
  //    var mapOptions = {
  //      center: latLng,
  //      zoom: 15,
  //      mapTypeId: google.maps.MapTypeId.ROADMAP
  //    };
  //
  //    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  //
  //  }, function(error){
  //    console.log("Could not get location");
   });
  //
  //
  //
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

  // $scope.addMyPosition = function(map) {
  //   $scope.map = map;
  //   new google.maps.Marker({
  //     map: $scope.map,
  //     animation: google.maps.Animation.DROP,
  //     position: {
  //       "lat": 41.5507300,
  //       "lng": -87.6512600
  //     }
  //
  //     // icon: 'https://image.freepik.com/icones-gratuites/gps-symbole-de-localisation_318-76275.jpg'
  //   });
  // };
  //
  //
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  $scope.initialize = function() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var inticor = $scope.start;
    var mapOptions = {
      zoom: 9,
      center: inticor,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
    // $scope.addMyPosition(map);
    directionsDisplay.setMap(map);
    calcRoute();

  };
  // google.maps.event.addDomListener(window, 'load', $scope.initialize());

  function calcRoute() {
    $scope.start = {};
    $scope.end ={};
    $scope.waypoints= [] ;

    for(var i=0; i< $rootScope.parcour.POIS.length; i++){
      if(i === 0){
        var L = new google.maps.LatLng($rootScope.parcour.POIS[i].location.Lng,$rootScope.parcour.POIS[i].location.Lat);

        $scope.start = L;
      }
      if(i == $rootScope.parcour.POIS.length-1){
        var k = new google.maps.LatLng($rootScope.parcour.POIS[i].location.Lng,$rootScope.parcour.POIS[i].location.Lat);

        $scope.end = k;
      }
      if(i !== 0 && i !== $rootScope.parcour.POIS.length-1){
        console.log($rootScope.parcour.POIS[i].location.Lat);
        var j = {location:{},stopover: true};
         j.location.lat = $rootScope.parcour.POIS[i].location.Lng;
        j.location.lng = $rootScope.parcour.POIS[i].location.Lat;
        j.stopover= true;
      $scope.waypoints.push(j);
    }
    }
    // for(var M; M <$scope.waypoints; M++){
    //   $scope.waypoints[M].stopover = true;
    // }
    console.log($scope.waypoints);

    var request = {
      origin: $scope.start,
      destination: $scope.end,
      waypoints: $scope.waypoints,
      travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }
  calcRoute();
  $scope.initialize();
}
