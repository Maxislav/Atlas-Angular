app.controller('objectsContrl', function ($scope, $interval, $timeout, factoryGetDevices, map, factoryGetOptions, factoryFormatDate, factoryMarker, canvasRender) {
    $scope.factoryGetDevices = factoryGetDevices;
    $scope.factoryGetOptions = factoryGetOptions;
    $scope.current = {};
    $scope.map = map.map;
    var getParms = 0;
    var F = parseFloat;
    var setDate = factoryFormatDate.stringToGetTime;

    $scope.setCurrent = function (imei) {
        for (var i = 0; i < $scope.factoryGetDevices.length; i++) {
            if ($scope.factoryGetDevices[i].imei == imei) {
                $scope.current = $scope.factoryGetDevices[i];
                factoryGetDevices.current = factoryGetDevices[i];
                if ($scope.current.lat && $scope.current.lng) {
                    $scope.map.setView([F($scope.current.lat), F($scope.current.lng)])
                }
                break;
            }
        }
    }
    $scope.$watch('factoryGetOptions.timeZone', function () {
        if ($scope.factoryGetOptions.timeZone) {
            init()
        }
    })
    $scope.$watch('factoryGetDevices.length', function () {
        if ($scope.factoryGetDevices.length) {
            init()
        }
    })
    function init() {
        getParms++
        if (1 < getParms) {
            refacto()
            console.log($scope.factoryGetOptions.timeZone)
        }
    }

    function refacto() {
        for (var i = 0; i < $scope.factoryGetDevices.length; i++) {
            $scope.factoryGetDevices[i]._dateTime = setDate($scope.factoryGetDevices[i].dateTime, $scope.factoryGetOptions.timeZone);
            $scope.factoryGetDevices[i]._elapsedTime = null;
            if (!$scope.factoryGetDevices[i]._timer) {
                watchers(i)
                $scope.factoryGetDevices[i]._timer = (function () {
                    return interval(i);
                })()
            }
        }
        function interval(_i) {
            var i = _i;
            function setDif() {
                $scope.factoryGetDevices[i]._elapsedTime = new Date().getTime() - $scope.factoryGetDevices[i]._dateTime;
            }
            return $interval(setDif, 1000)
        }
    }

    function watchers(i) {
        $scope.$watch('factoryGetDevices[' + i + '].dateTime', function () {
            if ($scope.factoryGetDevices[i]) {
                $scope.factoryGetDevices[i]._dateTime = setDate($scope.factoryGetDevices[i].dateTime, $scope.factoryGetOptions.timeZone);
                factoryMarker.marker(i);
            }
        })
        $scope.$watch('factoryGetDevices[' + i + ']._elapsedTime', function () {
            //factoryMarker.marker(i);
            var elapsedTime = $scope.factoryGetDevices[i]._elapsedTime
            var device = $scope.factoryGetDevices[i];
            if(!elapsedTime){
                device._state = 'NO_SIGNAL'
            }else if(elapsedTime< 600000){
                if(1<F(device.speed)){
                    device._state = 'MOVE'
                }else{
                    device._state = 'STOP'
                }
            }else{
                device._state = 'NO_SIGNAL'
            }
        })
        $scope.$watch('factoryGetDevices[' + i + ']._state',function(){
            factoryMarker.marker(i);
        })
        $scope.$watch('factoryGetDevices[' + i + ']._colorState',function(){
            var device = factoryGetDevices[i];
            if(device._state == 'NO_SIGNAL'  ){
                device._context && canvasRender.no_signal(device._context, device._colorState)
            }
            if(device._state == 'STOP'){
                device._context && canvasRender.stop(device._context, device._colorState)
            }

        })
    }
})