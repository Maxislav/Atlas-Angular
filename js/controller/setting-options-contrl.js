app.controller('settingOptionsContr', function($timeout,$scope, factorySettingOptions, factoryGetOptions,tileLayers){
    $scope.factorySettingOptions = factorySettingOptions;
    $scope.data = factoryGetOptions;
    $scope.selectMap = factoryGetOptions.map
    $scope.arrMapType = [];
    $scope.settingsShow = function(){
        $scope.factorySettingOptions.show = !$scope.factorySettingOptions.show;
    }
    function textMapDecode (map){
        switch (map){
            case 'ggl':
                return 'Google';
            break;
            case 'osm':
                return 'OSM'
            break;
            default : return 'Google'
        }
    }
    for(var opt in tileLayers){
        //console.log(opt)
        $scope.arrMapType.unshift({
            map: opt,
            text:textMapDecode(opt)
        })
    }

})