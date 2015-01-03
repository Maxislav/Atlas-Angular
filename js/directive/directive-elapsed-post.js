app
    .directive('elapsedpost', function (factoryGetDevices) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'item/elapsed-post.html',
            controller: function ($scope, $element) {
                $scope.factoryGetDevices = factoryGetDevices
                this.el = $element;
            }
        }
    })
    .directive('tik', function () {
        return{
            restrict: 'A',
            require: '^elapsedpost',
            link: function ($scope, $element, attr, elapsedpost) {
                $scope.$watch('seconds', function (val) {
                    if (5000 < $scope.millis) {
                        elapsedpost.el.css('color', 'red')
                    } else {
                        elapsedpost.el.css('color', 'white')
                    }
                })
            }
        }
    })
