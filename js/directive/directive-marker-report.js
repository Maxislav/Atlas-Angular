app
    .directive('markerReport', ['map', '$compile','factoryGetDevices','$timeout', function (map, $compile, factoryGetDevices, $timeout) {
        var f = parseFloat;
        function getDevice(imei){
            for(var i = 0; i<factoryGetDevices.length; i++){
                if(factoryGetDevices[i].imei == imei){
                    return factoryGetDevices[i]
                }
            }
        }
        return {
            restrict: 'AE',
            scope: {
                markerReport: '@'
            },
            link: function ($scope, $element, $attr) {
                var popup;
                $scope.params = JSON.parse($scope.markerReport);
                $scope.device = getDevice($scope.params.imei);
                var timeout;
                $element
                    .on('click', function () {
                            popup =  setPopup().addTo($scope.device._trackGroup);

                    })
                   .on('mouseenter', function () {
                        if(!popup){
                            popup =  setPopup().addTo($scope.device._trackGroup);
                            timeout && $timeout.cancel(timeout)
                        }
                    })
                    .on('mouseleave', function() {
                        timeout && $timeout.cancel(timeout)
                        timeout = $timeout(function(){
                            if(popup){
                                $scope.device._trackGroup.removeLayer(popup)
                                popup = null;
                            }
                        },2000)

                    })
                function setPopup(){
                    var text = '<reportpopup></reportpopup>'
                    var linkFn = $compile(text);
                    var content = linkFn($scope);
                    var popup = L.popup({offset: [0, -10], minWidth:120})
                        .setLatLng([f($scope.params.lat), f($scope.params.lng)])
                        .setContent(content[0])
                    return popup
                }
            }
        }
    }])
    .directive('reportpopup', function(){
        return{
            restrict: 'EA',
            templateUrl: 'item/report-popup.html',
            replace: true
        }
    })
