app.directive('infoobject',['$compile','factoryGetDevices','serviceShowElements', function($compile,factoryGetDevices,serviceShowElements){
    return {
        restrict: 'EA',
        replace: true,
        controller: function($scope, $element){
            $scope.serviceShowElements = serviceShowElements
            $scope.factoryGetDevices = factoryGetDevices
        },
        templateUrl: 'item/info-object.html'

    }
}])
