app
    .directive('markerReport', ['map', '$compile', function (map, $compile) {
        var f = parseFloat;
        return {
            restrict: 'AE',
            scope: {
                markerReport: '@'
            },
            link: function ($scope, $element, $attr) {
                var popup;
                $scope.params = JSON.parse($scope.markerReport)
                $element
                    .on('click', function () {
                        var text = '<reportmarker>' + '</remoprmarker>'

                        var linkFn = $compile(text);
                        var content = linkFn($scope);

                        popup = L.popup({offset: [0, -10], minWidth:120})
                            .setLatLng([f($scope.params.lat), f($scope.params.lng)])
                            .setContent(content[0])

                            .addTo(map.map);
                    })
                    /*.on('mouseenter', function () {
                        console.log($scope.params)
                    })*/


            }
        }
    }])
    .directive('reportmarker', function(){
        return{
            restrict: 'EA',
            templateUrl: 'item/report-popup.html',
            replace: true,
            link: function(scope, el, attr, cntrl){
                console.log(cntrl)
            }
        }
    })
