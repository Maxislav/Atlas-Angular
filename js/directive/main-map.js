app.directive('mainMap', function(windowSize, map){
    return{
        restrict: 'C',
        link: function(scope, el, attr){
            el.css('height',windowSize.height +'px');
            map.scope = scope


        }
    }
})