app.directive('mainMap', function (windowSize, map) {
    return{
        restrict: 'C',
        link: function (scope, el, attr) {


           //alert(document.body.clientHeight);
            el.css('height', document.body.clientHeight + 'px');
            map.scope = scope


        }
    }
})