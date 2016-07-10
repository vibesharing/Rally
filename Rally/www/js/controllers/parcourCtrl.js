function parcourCtrl($rootScope, $scope,$state, $stateParams, parcourService){

console.log($stateParams.filter);

$scope.parcour = {name:'', duration:'',category:'',theme:'',distance:''};
$scope.POI = {description:'',timetable:'',name:'',location:{lng:'',lat:''}};
$scope.POIS = [];


$scope.addPOI = function(POI){
  $scope.POIS.push(POI);
};
$scope.deletePOI = function(index){
  $scope.POIS.splice(index,1);
};


$scope.create = function(){
  parcourService.createParcour($scope.parcour).then(function(res){
    $scope.parcour = {name:'', duration:'',category:'',theme:'',distance:''};
  });

};
$scope.gotopagesoustheme= function(filter){
  $state.go('descrption', {id: filter});

};
$scope.goToDescription = function(){
  $rootScope.parcour = $scope.parcour;
  $state.go('descrption');
};

}
