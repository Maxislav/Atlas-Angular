app.factory('factoryReportMarker', ['$compile','map',function($compile,map){
    var f  = parseFloat;
    function render(context){
        context.clearRect(0,0,20,20);
        context.beginPath();
        context.arc(20/2, 20/2, 5, 0, 2 * Math.PI, false);
        context.fillStyle = 'red';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    }

    function divIcon(parms){
        //var canvas = document.createElement('canvas')
        var template = '<canvas width="20" height="20"></canvas>'

        var linkFn = $compile(template);
        var content = linkFn(map.scope);
        var context = content[0].getContext('2d');
        render(context)


        var icon = L.divIcon({
            className: 'my-div',
            iconAnchor:[10,10],
            html: content
        });
        return icon
    }

    function addMarker(arr){
        var arrMarkers = []
        for (var i = 0; i<arr.length; i++){
            var marker = L.marker([f(arr[i].lat),f(arr[i].lng)],{icon: divIcon(arr[i])})
            arrMarkers.push(marker)
        }

        return  arrMarkers
    }
    return {
        addMarker:addMarker
    }
}])
