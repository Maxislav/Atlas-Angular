app.controller('objectsContrl', function ($scope,factoryGetDevices, map, factoryGetOptions, factoryFormatDate){
    $scope.factoryGetDevices = factoryGetDevices;
    $scope.factoryGetOptions =factoryGetOptions;
    $scope.current = {};
    $scope.map = map.map;
    var getParms = 0;
    var F = parseFloat;
    var setDate = factoryFormatDate.stringToGetTime;

    $scope.setCurrent = function(imei) {
        for(var i=0; i<  $scope.factoryGetDevices.length; i++){
            if($scope.factoryGetDevices[i].imei == imei){
                $scope.current = $scope.factoryGetDevices[i];
                if($scope.current.lat && $scope.current.lng){
                    $scope.map.setView([F($scope.current.lat), F($scope.current.lng)])
                }
                break;
            }
        }
    }

    $scope.$watch('factoryGetOptions.timeZone', function(){
        if($scope.factoryGetOptions.timeZone){
            init()
        }
    })
    $scope.$watch('factoryGetDevices.length', function(){
        if($scope.factoryGetDevices.length){
            init()
        }
    })
    function init(){
        getParms++
        if(1<getParms){
            refacto()
            console.log($scope.factoryGetOptions.timeZone)
        }
    }
    function refacto() {
        for (var i = 0; i < $scope.factoryGetDevices.length; i++) {
            $scope.factoryGetDevices[i]._dateTime = setDate( $scope.factoryGetDevices[i].dateTime)
        }
    }

})