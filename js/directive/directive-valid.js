app.directive('valid', function(factoryValid){
    var valid = factoryValid

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            var name = attr.valid;
            function fromUser(text) {
                var transformedInput = valid[name](text)
                if(transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;  // or return Number(transformedInput)
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    }
})
