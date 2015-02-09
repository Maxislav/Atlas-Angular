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



            var x, y;
            el
                .on('mousedown',function(e){
                    moveMoveOn()
            })
                .on('mouseup',function(e){
                    mouseMoveOff()
                })


            function moveMoveOn(){
                el.on('mousemove', move)
            }
            function mouseMoveOff(){
                el.off('mousemove', move)
            }
            function move(e){
                //console.log(e.x)
            }




        }
    }
}])