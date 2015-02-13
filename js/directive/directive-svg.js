app.directive('reportGraphSvg',['serviceReport', function (serviceReport) {
    return {
        restrict: 'A',
        scope: {
            graphPath: '=',
            reportHeight: '=',
            reportWidth: '=',
            offsetLeft: '@'
        },
        replace: false,
        //template: '<path d="{{value}}" stroke="red" stroke-width="3" fill="none"></path>',
        link: function (scope, el, attr) {

            scope.graphPath;
            scope.serviceReport= serviceReport;


            var template = '';
            el.css('height',scope.reportHeight+'px');
            el.css('width', scope.reportWidth +'px' );
            el.css('left', scope.offsetLeft +'px');
            if(angular.isArray(scope.graphPath)){
                for(var i = 0; i<scope.graphPath.length; i++ ){
                    var string = 'M'+scope.graphPath[0].x+' '+scope.graphPath[0].y
                    for (var i = 1; i < scope.graphPath.length; i++) {
                        var ks = scope.graphPath[i];
                        var ke = scope.graphPath[i+1];
                        if(ks.x){
                            string+=' L'+ ks.x +' '+ ks.y
                        }

                    }

                }
                template = '<path d="'+string+'" fill="white" stroke="red" />'
                el.html(template);
               // el.css('width','500%')
            }
            scope.$watch(function(){
                return el.attr('offset-left')
            }, function(val){
                serviceReport.left = val
               // console.log(val)
            })


        }
    }
}]);