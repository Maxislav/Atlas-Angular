app.directive('mainMap', function (windowSize, map) {
    return{
        restrict: 'C',
        link: function (scope, el, attr) {
            el.css('height', document.body.clientHeight + 'px');
            map.scope = scope
        }
    }
})