app.directive('reportGraph', ['serviceShowElements',function(serviceShowElements){
    return {
        restrict: 'C',
        templateUrl: 'item/report-graph.html',
        controller: 'graphContrl',
        link: function(scope, el, attr, contrl){
            scope.serviceShowElements = serviceShowElements
           // console.log(el[0].clientHeight)
            scope.reportGraphHeight = el[0].clientHeight
        }
    }
}])