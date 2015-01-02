app.directive('stateObj', function () {
    return {
        restrict: 'EA',
        scope: {
            device: '=device',
            elapsedTime: '=elapsedTime'
        },
        controller: function ($scope, $element, $attrs) {
            function color(milSec) {
               var _color = 'white'
                if (!milSec) {
                    _color = 'white'
                   // return 'white'
                }else if (milSec < 600000) {
                    _color = '#68FF49'
                   // return '#68FF49'
                } else if (milSec < 1000 * 3600 * 24) {
                    var c =  (255*milSec)/(1000 * 3600 * 24);
                    c = parseInt(c);
                    _color = 'rgb(255,255,'+c+')'
                    //return 'rgb(255,255,'+c+')'
                }
                $scope.device._colorState = _color;
                return _color;
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