app.directive('report', function(serviceShowElements){
    return{
        restrict: 'C',
        templateUrl: 'item/report.html',
        controller: function($scope, $element){
            $scope.serviceShowElements = serviceShowElements
            $scope.fromDate = new Date()
            $scope.toDate = new Date()
        },
        link: function(scope, el, attr){
            el.css('display','inherit')
        }
    }
})
