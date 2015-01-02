app.directive('stateObj', function () {
    var F = parseFloat;
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
                    _color = 'white';
                }else if (milSec < 600000) {
                    if($scope.device._state == 'MOVE'){
                        _color = '#8080FF'
                    }else{
                        _color = '#68FF49'
                    }

                } else if (milSec < 1000 * 3600 * 24) {
                    var c =  (255*milSec)/(1000 * 3600 * 24);
                    c = parseInt(c);
                    _color = 'rgb(255,255,'+c+')'
                }
                $scope.device._colorState = _color;
                return _color;
            }

            function state(){
                if(!$scope.elapsedTime){
                    $scope.device._state = 'NO_SIGNAL'
                }else if($scope.elapsedTime< 600000){
                    if(1<F($scope.device.speed)){
                        $scope.device._state = 'MOVE'
                    }else{
                        $scope.device._state = 'STOP'
                    }
                }else{
                    $scope.device._state = 'NO_SIGNAL'
                }
            }

            $scope.$watch('elapsedTime', function () {
                state();
                $element.css('backgroundColor', color($scope.elapsedTime));
            })
        },
        link: function (scope, el, attr) {
            el.css('width', '12px')
            el.css('height', '12px');
            el.css('display', 'inline-block')
            el.css('boxShadow', '1px 1px 2px rgba(0,0,0,0.4)')
            el.css('margin', '2px')
            el.css('borderRadius', '50%')
            el.css('border', '1px solid #003300')
            el.css('transition', '0.3s')
        }
    }
})