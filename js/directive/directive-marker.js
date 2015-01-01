
app.directive('marker', function(){
    return {
        restrict: 'EA',
        scope: {
            name:'@name'
        },
        replace: true,
        template: '<canvas width="30" height="30"></canvas>',
        controller: function($scope, $element, $attrs){

            var canvas = $element[0]
            var context = canvas.getContext('2d');
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 7;
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'rgb(63, 255, 0)';
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = '#003300';
            context.stroke();

        }
    }
})
