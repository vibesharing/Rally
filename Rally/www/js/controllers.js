angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})




.controller('ParcourCtrl', function($rootScope, $scope,$state, $stateParams, Chats, parcourService){

$scope.parcour = {name:'', duration:'',category:'',theme:'',distance:''};
$scope.POI = {description:'',timetable:'',name:'',location:{lng:'',lat:''}};
$scope.POIS = [];


$scope.addPOI = function(POI){
  $scope.POIS.push(POI);
};
$scope.deletePOI = function(index){
  $scope.POIS.splice(index,1);
};


$scope.addParcour = function(){
  $scope.parcour.POIS = $scope.POIS;
  parcourService.createParcour($scope.parcour).then(function(res){
    $scope.parcour = {name:'', duration:'',category:'',theme:'',distance:''};
  });

};
$scope.goToDescription = function(){
  $rootScope.parcour = $scope.parcour;
  $state.go('descrption');
};


})



.controller ('mapCtrl', function($rootScope,$scope,$stateParams, $state,$http, $cordovaGeolocation){
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

  }, function(error){
    console.log("Could not get location");
  });


});
})














.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
