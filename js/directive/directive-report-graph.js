app.directive('reportGraph', ['serviceShowElements',function(serviceShowElements){
    return {
        restrict: 'C',
        templateUrl: 'item/report-graph.html',
        controller: 'graphContrl',
        link: function(scope, el, attr, contrl){
            scope.serviceShowElements = serviceShowElements
        }
    }
}])