app.directive('graphPath', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            graphPath: '='
        },
        replace: false,
        template: '<path d="{{value}}" stroke="red" stroke-width="3" fill="none"></path>',
        link: function (scope, el, attr) {
            scope.value = null;
            if (scope.graphPath && scope.graphPath.length) {
                var string = 'M'+scope.graphPath[0].x+' '+scope.graphPath[0].y
                for (var i = 1; i < scope.graphPath.length-1; i++) {
                    var ks = scope.graphPath[i];
                    var ke = scope.graphPath[i+1];
                    string+=' L'+ ks.x +' '+ ks.y
                }
                scope.value = string
                console.log(string)
            }
        }
    }
})