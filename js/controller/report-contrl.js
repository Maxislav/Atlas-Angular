app.controller('reportContrl', ['$scope','serviceShowElements',  function($scope, serviceShowElements){
    $scope.serviceShowElements = serviceShowElements;

    var d= new Date()

    $scope.before = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    $scope.after = new Date(d.getFullYear(), d.getMonth(), d.getDate())
}])
