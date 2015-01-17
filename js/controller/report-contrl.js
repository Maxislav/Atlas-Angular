app.controller('reportContrl', ['$scope', 'serviceShowElements', 'factoryGetDevices', 'factoryFormatDate', '$http', '$filter', 'map', 'factoryReportMarker', 'factoryGetOptions', function ($scope, serviceShowElements, factoryGetDevices, factoryFormatDate, $http, $filter, map, factoryReportMarker, factoryGetOptions) {
    $scope.serviceShowElements = serviceShowElements;
    var F = parseFloat;
    var d = new Date()

    $scope.before = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    $scope.after = new Date(d.getFullYear(), d.getMonth(), d.getDate())

    $scope.devices = factoryGetDevices;
    $scope.current;
    $scope.factoryGetOptions = factoryGetOptions;


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
                    $scope.devices.current._trackPoints = d;
                    for (var i = 0; i < $scope.devices.length; i++) {
                        if ($scope.devices[i]._trackPoints) {
                            trackAddToMap($scope.devices[i]);
                        }

                    }
                })
        }
    }

    function trackAddToMap(device) {
        var orderBy = $filter('orderBy');
        var limit = $filter('limitTo');
        var myFilter = $filter('myFilter')
        var d = device._trackPoints;

        var arr = orderBy(d, 'dateTime');
        var arrP = myFilter(arr,factoryGetOptions.stepPoints);
        if(d && d.length){
            device._maxSpeed = limit(orderBy(d, function (el) {
                return F(el.speed)
            }, true), 1)[0].speed;

           // console.log(myFilter(d,factoryGetOptions.stepPoints))
        }
        device._points = d && d.length
        var markers = factoryReportMarker.addMarker(arrP, device);
        var pointList = setArrLatLngs(arr);
        var polilyne = L.polyline(pointList, {
            color: 'blue',
            weight: 10,
            opacity: 0.3,
            smoothFactor: 1
        });

        var patterns = [
            { offset: '5%', repeat: '100px', symbol: new L.Symbol.ArrowHead({pixelSize: 10, headAngle: 45, polygon: false, pathOptions: {stroke: true, weight: 2, color: '#0024ff', opacity: "0.9"}})}
        ]
        var arrowHead = L.polylineDecorator(polilyne, {patterns: patterns});
        device._trackGroup && map.map.removeLayer(device._trackGroup)
        var group = [arrowHead, polilyne];

        for (var i = 0; i < markers.length; i++) {
            group.push(markers[i])
        }
        ;
        device._trackGroup = L.featureGroup(group);
        device._trackGroup.addTo(map.map);

    }
    $scope.$watchCollection('[factoryGetOptions.limitSpeed,factoryGetOptions.stepPoints]', function(){
        for (var i = 0; i < $scope.devices.length; i++) {
            if ($scope.devices[i]._trackPoints) {
                trackAddToMap($scope.devices[i]);
            }
        }
    })


    $scope.hideTrack = function () {
        $scope.devices.current._trackGroup && map.map.removeLayer($scope.devices.current._trackGroup);
        $scope.devices.current._maxSpeed && delete  $scope.devices.current._maxSpeed;
        $scope.devices.current._points && delete  $scope.devices.current._points;
        $scope.devices.current._trackPoints && delete  $scope.devices.current._trackPoints
    }

    function setArrLatLngs(arr) {
        var arrLatLngs = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].lat && arr[i].lat != 'null') {
                arrLatLngs.push([
                    F(arr[i].lat),
                    F(arr[i].lng)
                ])
            }
        }
        return arrLatLngs
    }

}])
    .filter('myFilter', function(){
        return function(input, n, link) {
           if(link){
               var k=0;
               var end = input.length/n
               while(k<end){
                   input.splice(k, n-1)
                   k++
               }
               return input;
           }
            else {
               var arr = []
               for (var i = 0; i<input.length; i++){
                   if(i%n == 0 || i==input.length-1){
                       arr.push(input[i])
                   }
               }
               return arr
           }

        };
    })
