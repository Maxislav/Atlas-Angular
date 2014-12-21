app.controller('objectsContrl', function ($scope,factoryGetDevices, map, factoryGetOptions){
    $scope.factoryGetDevices = factoryGetDevices;
    $scope.factoryGetOptions =factoryGetOptions;
    $scope.current = {};
    $scope.map = map.map;
    var getParms = 0;
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
            rfacto()
            console.log($scope.factoryGetOptions.timeZone)
        }
    }
    function rfacto() {
        for (var i = 0; i < $scope.factoryGetDevices.length; i++) {
            $scope.factoryGetDevices[i]._dateTime = setDate( $scope.factoryGetDevices[i].dateTime)
        }
        $scope
    }
    function setDate(string) {
        var arr = ('' + string).split('');
        var yy = '' + arr[0] + arr[1];
        var mm = '' + arr[2] + arr[3];
        mm = parseFloat(mm);
        mm--;
        var dd = '' + arr[4] + arr[5];
        var hh = '' + arr[6] + arr[7];
        var mi = '' + arr[8] + arr[9];
        var ss = '' + arr[10] + arr[11];
        var date = new Date('20' + yy, mm, dd, hh, mi, ss);
        return date.getTime();
    }


})