app.directive('mask', function(windowSize,srvModal){
    return{
        restrict: 'E',
        link: function(scope, el, attr){
            srvModal.maskScope = scope;
            el.css('height',windowSize.height +'px');
        }
    }
})