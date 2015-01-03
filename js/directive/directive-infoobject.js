app.directive('infoobject',['$compile','factoryGetDevices','serviceInfo', function($compile,factoryGetDevices,serviceInfo){
    return {
        restrict: 'EA',
        replace: true,
        controller: function($scope, $element){
            $scope.serviceInfo = serviceInfo
            $scope.factoryGetDevices = factoryGetDevices
        },
        templateUrl: 'item/info-object.html'

    }
}])
