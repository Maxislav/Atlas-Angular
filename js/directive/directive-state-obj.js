app.directive('stateObj', function () {
    return {
        restrict: 'EA',
        scope: {
            elapsedTime: '=elapsedTime'
        },
        controller: function ($scope, $element, $attrs) {
            function color(milSec) {
                if (!milSec) {
                    return 'white'
                }
                if (milSec < 600000) {
                    return '#68FF49'
                } else if (milSec < 1000 * 3600 * 24) {
                    var c =  (255*milSec)/(1000 * 3600 * 24);
                    c = parseInt(c);
                    return 'rgb(255,255,'+c+')'
                }
                return 'white'
            }
            $scope.$watch('elapsedTime', function () {
                $element.css('backgroundColor', color($scope.elapsedTime));
            })
        },
        link: function (scope, el, attr) {
            el.css('width', '12px')
            el.css('height', '12px');
            el.css('display', 'inline-block')
            el.css('boxShadow', '1px 1px 2px rgba(0,0,0,0.4')
            el.css('margin', '2px')
            el.css('borderRadius', '50%')
            el.css('transition', '5s')
        }
    }
})