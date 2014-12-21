app.controller('objectsContrl', function ($scope,factoryGetDevices){
    $scope.factoryGetDevices = factoryGetDevices;
    $scope.current = {};
    $scope.setCurrent = function(imei) {
        for(var i=0; i<  $scope.factoryGetDevices.length; i++){
            if($scope.factoryGetDevices[i].imei == imei){
                $scope.current = $scope.factoryGetDevices[i];
                break;
            }
        }
    }
})