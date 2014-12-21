app.directive('mainMap', function(windowSize){
    return{
        restrict: 'C',
        link: function(scope, el, attr){
            el.css('height',windowSize.height +'px');
        }
    }
})