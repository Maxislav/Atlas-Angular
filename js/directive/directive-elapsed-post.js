app.directive('elapsedpost', function(factoryGetDevices){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'item/elapsed-post.html',
      //  template: '<div class="elapsed-post">{{factoryGetDevices.currentTime}}</div>',
        controller: function($scope, $element){
            $scope.factoryGetDevices = factoryGetDevices
           // $scope.time = 'tddddddddddddt'
        }
    }
})
