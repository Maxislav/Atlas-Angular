app.directive('markerReport', ['map',function(map){
    var f = parseFloat;
    return {
        restrict: 'AE',
        scope: {
            markerReport: '@'
        },
        link: function($scope, $element, $attr){
            var popup;
            $scope.params = JSON.parse($scope.markerReport)
            $element.on('click', function(){
              //  console.log( $scope.params.speed)
                popup  =  L.popup({offset:[0,-10]})
                    .setLatLng([f($scope.params.lat),f($scope.params.lng)])
                    .setContent( $scope.params.speed)
                    .addTo(map.map);
            })


        }
    }
}])