app.factory('canvasRender', function(){

    function getRadianAngle(degreeValue) {
        return degreeValue * Math.PI / 180;
    }

    function move(context,azimuth){
        context.clearRect(0,0,30,30);
        context.beginPath();
        context.moveTo(15,2);
        context.lineTo(20,20);
        context.lineTo(15,18);
        context.lineTo(10,18);

        context.rotate(getRadianAngle(parseFloat(azimuth)));

        context.fillStyle = 'blue';
        context.fill();
        context.closePath();
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
