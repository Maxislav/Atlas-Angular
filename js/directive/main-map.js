app.directive('mainMap', function(windowSize, setMap, map, mapLocation){
    return{
        restrict: 'C',
        link: function(scope, el, attr){
            el.css('height',windowSize.height +'px');
            setMap(scope);
        }
    }
})