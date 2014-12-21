var app = angular.module('app', ['ngAnimate'])

app.config(function ($httpProvider) {    // [url]http://habrahabr.ru/post/181009/[/url]
    $httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? angular.toParam(data) : data;
    };
});

app.constant('windowSize', {
    width: window.innerWidth,
    height: window.innerHeight
})
app.constant('tileLayers', {
    ggl: new L.TileLayer('http://mt0.googleapis.com/vt/lyrs=m@207000000&hl=ru&src=api&x={x}&y={y}&z={z}&s=Galile', {maxZoom: 18, minZoom: 3}),
    osm: new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
})
app.constant('timeZone',(function(){
    var a = [];
    for (var i = -23; i<24; i++){
        a.push({
            text: (i<0) ? ''+i : '+'+i,
            value: i
        })
    }
    return a
})());


app.service('map', function (tileLayers) {
    var map = L.map('mapMap', {dragging: false});
    this.map = map;
    this.lat = null
})

app.factory('hashLocation', function (map) {
    var lat, lng;

    function latlng() {
        lat = map.map.getCenter().lat.toFixed(6),
        lng = map.map.getCenter().lng.toFixed(6);
    }

    function setHash() {
        latlng();
        window.location.hash = '/param?lat=' + lat + '&lng=' + lng
    }

    function event() {
        map.map.on('dragend', setHash)
    }

    return {
        event: event
    }
})





