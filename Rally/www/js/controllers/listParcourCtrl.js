function listParcourCtrl($rootScope, $scope, $state, $stateParams, parcourService) {
  console.log($stateParams.filter);
  parcourService.get().then(function(res){
      $scope.parcours = res.data;
      console.log(res.data);
  });

  $scope.goToMap = function(parcour) {
    $rootScope.parcour = parcour;
    $state.go('tab.map', {
      'id': parcour.id
    });
  };
}
