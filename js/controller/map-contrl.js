app.controller('mapCntrl', function($scope , factoryGetOptions, tileLayers, map, factoryGetDevices){

    var load = false;
    $scope.ll = '44'
    $scope.map=map.map
    map.scope.factoryGetDevices = factoryGetDevices
    $scope.factoryGetOptions = factoryGetOptions;
    $scope.$watch('factoryGetOptions.map', function(){
        if( $scope.factoryGetOptions.map){
            $scope.setBaseLayer($scope.factoryGetOptions.map)
            tileLayers[$scope.factoryGetOptions.map].addTo($scope.map)
            !load && initMap ()
            load = true
        }
    })
    function initMap(){
        $scope.map.setView([$scope.factoryGetOptions.lat,$scope.factoryGetOptions.lng],$scope.factoryGetOptions.zoom )
        $scope.map.dragging.enable();
        $scope.map.on('move', $scope.location);
        $scope.map.on('mousemove', $scope.mouseLocation)
    }
    $scope.mouseLocation = function(e){
        $scope.factoryGetOptions.mouselat = e.latlng.lat.toFixed(5)
        $scope.factoryGetOptions.mouselng = e.latlng.lng.toFixed(5)
        $scope.$apply()
    }
    $scope.location = function (){
        $scope.factoryGetOptions.lat = $scope.map.getCenter().lat.toFixed(5);
        $scope.factoryGetOptions.lng = $scope.map.getCenter().lng.toFixed(5);
    }
    $scope.$watch('factoryGetOptions.lat');
    $scope.setBaseLayer = function (type) {
        tileLayers[type].addTo($scope.map)
        for (var opt in tileLayers) {
            if (opt != type) {
                $scope.map.removeLayer(tileLayers[opt])
            }
        }
    }


})
