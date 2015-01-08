app.controller('reportContrl', ['$scope', 'serviceShowElements', 'factoryGetDevices', 'factoryFormatDate','$http', function ($scope, serviceShowElements, factoryGetDevices, factoryFormatDate, $http) {
    $scope.serviceShowElements = serviceShowElements;

    var d = new Date()

    $scope.before = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    $scope.after = new Date(d.getFullYear(), d.getMonth(), d.getDate())

    $scope.devices = factoryGetDevices
    $scope.current

    $scope.$watch('devices.current', function () {
        $scope.devices.current && ($scope.currentImei = $scope.devices.current.imei);
    })
    $scope.changeCurrent = function () {

    }
    $scope.$watch('currentImei', function (newVal, oldVal) {
        if (factoryGetDevices.current.imei != newVal) {
            $scope.devices.current = (function () {
                for (var i = 0; i < factoryGetDevices.length; i++) {
                    if (factoryGetDevices[i].imei == newVal) {
                        return factoryGetDevices[i]
                    }
                }
            })()
        }
    })

    $scope.showTrack = function(){
        if($scope.devices && $scope.devices.current && $scope.devices.current.imei){
            var b = $scope.before
            var before = new Date(b.getFullYear(), b.getMonth(), b.getDate()+1);
            var from = factoryFormatDate.dateToString($scope.after);
            var to = factoryFormatDate.dateToString(before);
          //  $http.post

            console.log(from+':'+to)
        }

    }
}])
