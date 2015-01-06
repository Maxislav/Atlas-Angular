app.controller('reportContrl', ['$scope','serviceShowElements', 'factoryGetDevices',  function($scope, serviceShowElements, factoryGetDevices){
    $scope.serviceShowElements = serviceShowElements;

    var d= new Date()

    $scope.before = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    $scope.after = new Date(d.getFullYear(), d.getMonth(), d.getDate())

    $scope.devices = factoryGetDevices
    $scope.current

   $scope.$watch('devices.current',function(){
        $scope.devices.current && ($scope.currentImei =  $scope.devices.current.imei);
    })
    $scope.changeCurrent = function(){

    }
    $scope.$watch('currentImei',function(newVal,oldVal){
        if(factoryGetDevices.current.imei != newVal){
            $scope.devices.current = (function(){
                for (var i = 0; i<factoryGetDevices.length; i++){
                    if(factoryGetDevices[i].imei == newVal){
                        return factoryGetDevices[i]
                    }
                }
            })()
        }
    })
}])
