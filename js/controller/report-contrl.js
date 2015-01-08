app.controller('reportContrl', ['$scope', 'serviceShowElements', 'factoryGetDevices', 'factoryFormatDate', '$http', '$filter','map', function ($scope, serviceShowElements, factoryGetDevices, factoryFormatDate, $http, $filter, map) {
    $scope.serviceShowElements = serviceShowElements;
    var F = parseFloat;
    var d = new Date()

    $scope.before = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    $scope.after = new Date(d.getFullYear(), d.getMonth(), d.getDate())

    $scope.devices = factoryGetDevices;
    $scope.current;

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

    $scope.showTrack = function () {
        if ($scope.devices && $scope.devices.current && $scope.devices.current.imei) {
            var b = $scope.before;
            var before = new Date(b.getFullYear(), b.getMonth(), b.getDate() + 1);
            var from = factoryFormatDate.dateToString($scope.after);
            var to = factoryFormatDate.dateToString(before);
            $http
                .post('php/showTrack.php', {
                    imei: $scope.devices.current.imei,
                    from: from,
                    to: to
                })
                .success(function (d) {
                    var orderBy = $filter('orderBy');
                    var arr = orderBy(d, 'dateTime');
                    console.log(arr);
                    var pointList = setArrLatLngs(arr);
                    var polilyne =  L.polyline(pointList, {
                        color: 'blue',
                            weight: 5,
                            opacity: 0.5,
                        smoothFactor: 1

                    });
                   // firstpolyline.addTo(map.map)
                    $scope.devices.current.trackGroup && map.map.removeLayer($scope.devices.current.trackGroup)
                    $scope.devices.current.trackGroup = L.featureGroup([polilyne])
                        .bindPopup('Hello world!')
                        //.on('click', function() { alert('Clicked on a group!'); })

                    $scope.devices.current.trackGroup.addTo(map.map);
                   // $scope.current.trackGroup.

                })

        }
    }

    function setArrLatLngs (arr){
        var arrLatLngs = []
        for (var i = 0; i<arr.length; i++){
            arrLatLngs.push([
                F(arr[i].lat),
               F(arr[i].lng)
            ])
        }
        return arrLatLngs

    }

}])
