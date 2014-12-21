app.controller('objectsContrl', function ($scope,factoryGetDevices, map){
    $scope.factoryGetDevices = factoryGetDevices;
    $scope.current = {};
    $scope.map = map.map;
    var F = parseFloat;

    $scope.setCurrent = function(imei) {
        for(var i=0; i<  $scope.factoryGetDevices.length; i++){
            if($scope.factoryGetDevices[i].imei == imei){
                $scope.current = $scope.factoryGetDevices[i];
                $scope.map.setView([F($scope.current.lat), F($scope.current.lng)])
                break;
            }
        }
    }
})