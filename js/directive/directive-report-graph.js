app.directive('reportGraph', ['serviceShowElements','serviceReport',
    function(serviceShowElements,serviceReport){
    return {
        restrict: 'C',
        templateUrl: 'item/report-graph.html',
        controller: 'graphContrl',
        link: function(scope, el, attr, contrl){
            scope.serviceReport = serviceReport;



            scope.serviceShowElements = serviceShowElements;
            scope.reportGraphHeight = el[0].clientHeight;

            scope.reportGraphWidth = (serviceReport.scale) * window.document.body.clientWidth ;

            scope.$watch('serviceReport.scale',function(){
                scope.reportGraphWidth = (serviceReport.scale) * window.document.body.clientWidth ;
            });
            var startX, endX, dx;
            var body = angular.element(document.body)

           /* el.on('mousedown',moveMoveOn);
            el.on('mouseup',function(){
                mouseMoveOff()
                console.log('up')
            });

            function moveMoveOn(e){
                 startX = e.x;
                 el.off('mousedown');
                 body.bind('mousemove', move);
                 console.log('down1')
            }
            function mouseMoveOff(){
                body.unbind('mousemove',move);
                el.on('mousedown',moveMoveOn)
            }
            function move(e){
                dx = e.clientX - startX;
                serviceReport.left = dx;
              //  console.log(dx);
            }*/
        }
    }
}])