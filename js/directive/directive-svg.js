app.directive('reportGraphSvg', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            graphPath: '=',
            reportHeight: '='
        },
        replace: false,
        //template: '<path d="{{value}}" stroke="red" stroke-width="3" fill="none"></path>',
        link: function (scope, el, attr) {
            scope.graphPath
            var template = '';
            el.css('height',scope.reportHeight+'px');
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
                el.html(template)
               // el.css('width','500%')
            }
        }
    }
});