function dashCtrl($rootScope, $scope,$state, $stateParams, parcourService){

  $scope.gotopagesoustheme = function(filter){
    console.log(filter);
    $state.go('tab.sous-theme', {'filter': filter});

  };
}
