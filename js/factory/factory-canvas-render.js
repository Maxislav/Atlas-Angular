app.factory('canvasRender', function(){

    function getRadianAngle(degreeValue) {
        return degreeValue * Math.PI / 180;
    }

    function move(context,azimuth){
        context.clearRect(0,0,30,30);

        context.translate(15,15);
        context.rotate(getRadianAngle(parseFloat(azimuth)));

        context.beginPath();
        context.moveTo(15-15,2-15);
        context.lineTo(22-15,20-15);
        context.lineTo(15-15,18-15);
        context.lineTo(8-15,20-15);



        context.fillStyle = '#8080FF';
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
        console.log('stop:'+color)
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
        console.log('no_signal:'+color)
    }

    return {
        move:move,
        stop:stop,
        no_signal: no_signal
    }
})
