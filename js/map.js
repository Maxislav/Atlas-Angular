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

app.service('mapLocation', function (map) {
    this.latlng = {lat: 'ds'}
    var s;

    function location() {
        s.latlng.lat = map.map.getCenter().lat.toFixed(6)
        s.latlng.lng = map.map.getCenter().lng.toFixed(6)
        s.$apply()
    }

    function mouseLocation(e) {
        s.mouselatlng.lat = e.latlng.lat.toFixed(6)
        s.mouselatlng.lng = e.latlng.lng.toFixed(6)
        s.$apply()
    }

    function event(scope) {
        s = scope
        map.map.on('move', location)

        map.map.on('mousemove', mouseLocation)
    }

    this.location = event
})

app.factory('setMap', function ($http, $timeout, map, tileLayers, hashLocation, mapLocation) {
    var params = {
        lat: 50.442,
        lng: 30.558,
        zoom: 13,
        map: 'ggl'
    }
    var m = map.map;

    function setMap(scope) {
        $timeout(function () {
            tileLayers[params.map].addTo(m);
            m.setView([params.lat, params.lng], params.zoom);
            m.dragging.enable();
            hashLocation.event();
            mapLocation.location(scope)
        }, 1000)
    }

    return setMap
})



