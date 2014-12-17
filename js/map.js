var app = angular.module('app',[])

app.constant('windowSize', {
    width: window.innerWidth,
    height: window.innerHeight
})
app.constant('tileLayers',{
    ggl: new L.TileLayer('http://mt0.googleapis.com/vt/lyrs=m@207000000&hl=ru&src=api&x={x}&y={y}&z={z}&s=Galile',{maxZoom: 18,minZoom:3}),
    osm: new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
})

app.service('map', function(tileLayers){
    var map =  L.map('mapMap', {dragging:false});
    this.map = map;
})

app.factory('hashLocation', function(map){
    var lat,lng;
    function latlng(){
        lat = map.map.getCenter().lat.toFixed(6),
        lng = map.map.getCenter().lng.toFixed(6);
    }
    function setHash(){
        latlng();
        window.location.hash = '/param?lat='+lat+'&lng='+lng
    }
    function event (){
       map.map.on('dragend',setHash)
    }
    return {
        event:event
    }
})

app.factory('setMap', function($http, $timeout, map, tileLayers, hashLocation){
    var params = {
        lat: 50.442,
        lng :30.558,
        zoom: 13,
        map: 'ggl'
    }
    var m = map.map;
    function getParam(){
        $timeout(function(){
            tileLayers[params.map].addTo(m);
            m.setView([params.lat, params.lng], params.zoom);
            m.dragging.enable();
           hashLocation.event()
        },1000)
    }
    return getParam
})


app.directive('mainMap', function(windowSize, setMap,map){
    return{
        restrict: 'C',
        link: function(scope, el, attr){
            el.css('height',windowSize.height +'px');
            setMap();
        }
    }
})
