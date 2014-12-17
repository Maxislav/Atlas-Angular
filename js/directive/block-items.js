app.directive('blockItem', function(windowSize){
    var height = windowSize.height - 30
    return{
        restrict: 'C',
        link: function(scope, el, attr){
            el.css('height', height+ 'px')
        }
    }
})

