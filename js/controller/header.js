app.controller('headCntrl', function($scope){
    $scope.item = {};
    $scope.show = function(name){
        $scope.item[name] = ($scope.item[name] == 'show') ? '': 'show'
    }
})