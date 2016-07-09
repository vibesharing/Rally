function mapCtrl($rootScope,$scope,$stateParams, $state,$http, $cordovaGeolocation){
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      $http.get('http://192.168.3.196:8000/users').then(function(res){
        $scope.listProfile = res.data;
        for(var i =0; i < $scope.listProfile.length; i++){
          var image = {
            url: '../../img/'+$scope.listProfile[i].Firstname+'.jpg',
            size: new google.maps.Size(200, 320),
            origin: new google.maps.Point(0, 0)
          };
          var title_name = $scope.listProfile[i].Firstname;
          new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: $scope.listProfile[i].LatLng,
          });
        }
      });
    });
  });
}
