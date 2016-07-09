function mapCtrl($scope, $state,$http, $cordovaGeolocation) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    //  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
     //
    //    var latLng = position;
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
    //  });
    //
    $scope.addMyPosition = function(map){
      $scope.map = map;
    new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: {
                    "lat": 41.5507300,
                    "lng": -87.6512600
                },
              icon:'https://image.freepik.com/icones-gratuites/gps-symbole-de-localisation_318-76275.jpg'
          });
        };
    //
    //
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
  $scope.initialize = function(){
        directionsDisplay = new google.maps.DirectionsRenderer();
        var inticor= {
              "lat": 41.8507300,
              "lng": -87.6512600
          };
        var mapOptions =
                {
                    zoom: 9,
                    center: inticor,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.addMyPosition(map);
        directionsDisplay.setMap(map);
        calcRoute();

    };
// google.maps.event.addDomListener(window, 'load', $scope.initialize());

function calcRoute() {
  var start = {
        "lat": 41.8507300,
        "lng": -87.6512600
    };
  var end = {
        "lat": 40.8507300,
        "lng": -87.6512600
    };
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}
$scope.initialize();
}
