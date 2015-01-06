app.directive('mainMap', function (windowSize, map) {
    return{
        restrict: 'C',
        link: function (scope, el, attr) {
            var width = screen.height;

            var height = screen.width;

            var screenRatio;

            var realWidth;
            var realHeight;
            if (isNaN(screenRatio)) {

                if (window.innerHeight > window.innerWidth) {
                    realWidth = window.innerHeight;
                    realHeight = window.innerWidth;
                    screenRatio = (window.innerWidth / window.innerHeight);
                } else {
                    realWidth = window.innerWidth;
                    realHeight = window.innerHeight;
                    screenRatio = (window.innerHeight / window.innerWidth);
                }

            }
              console.log(realHeight)

            el.css('height', realHeight + 'px');
            map.scope = scope


        }
    }
})