app.controller('settingOptionsContr', function (timeZone, $timeout, map, $scope, factorySettingOptions, factoryGetOptions, tileLayers, factoryGetDevices) {


    $scope.factorySettingOptions = factorySettingOptions;
    $scope.data = factoryGetOptions;
    $scope.factoryGetDevices = factoryGetDevices;

    $scope.selectMap = factoryGetOptions.map;
    $scope.timeZone = factoryGetOptions.timeZone;
    $scope.timeZones = timeZone;
    $scope.arrMapType = [];
    $scope.map = map.map;
    var selectDevice;

    $scope.checkbox = [];
    $scope.checkboxChange = function(N, _id){
        for(var i= 0; i<$scope.checkbox.length; i++){
            if(i!=N){
                $scope.checkbox[i] = false
            }
        }
        if($scope.checkbox[N]){
            selectDevice = _id
        }else{
            selectDevice = null
        }
        console.log(selectDevice)
    }

    $scope.settingsShow = function () {
        $scope.factorySettingOptions.show = !$scope.factorySettingOptions.show;
    }
    function textMapDecode(map) {
        switch (map) {
            case 'ggl':
                return 'Google';
                break;
            case 'osm':
                return 'OSM'
                break;
            default :
                return 'Google'
        }
    }

    for (var opt in tileLayers) {
        $scope.arrMapType.unshift({
            map: opt,
            text: textMapDecode(opt)
        })
    }

    $scope.$watch('data.map', function () {
        if ($scope.data && $scope.data.map) {
            $scope.setBaseLayer($scope.data.map)
        }
        console.log($scope.data && $scope.data.map)
    })
    $scope.$watch('data.timeZone', function () {
        console.log($scope.data.timeZone)
    })

    $scope.setBaseLayer = function (type) {
        tileLayers[type].addTo($scope.map)
        for (var opt in tileLayers) {
            if (opt != type) {
                $scope.map.removeLayer(tileLayers[opt])
            }
        }
    }

    $scope.settingsDone = function(){
        console.log($scope.checkbox)
    }
})