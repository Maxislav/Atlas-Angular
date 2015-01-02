app.factory('canvasRender', function(){
    function move(context,azimuth){
        context.clearRect(0,0,30,30);
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'blue';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
        console.log(azimuth+ ' degree')
    }
    function stop(context, color){
        context.clearRect(0,0,30,30);
        context.beginPath();
        context.arc(30/2, 30/2, 7, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
        console.log(color)
    }
    function no_signal(context, color){
        context.clearRect(0,0,30,30);
        context.beginPath();
        context.arc(30/2, 30/2, 7, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
        console.log(color)
    }

    return {
        move:move,
        stop:stop,
        no_signal: no_signal
    }
})
