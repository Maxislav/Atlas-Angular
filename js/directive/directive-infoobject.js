app.directive('infoobject',['$compile','factoryGetDevices', function($compile,factoryGetDevices){


    return {
        restrict: 'EA',
        replace: true,
        controller: function($scope, $element){
            $scope.factoryGetDevices = factoryGetDevices
        },
        templateUrl: 'item/info-object.html'

    }
}])
