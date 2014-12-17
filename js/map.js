var app = angular.module('app',[])

app.constant('windowSize', {
    width: window.innerWidth,
    height: window.innerHeight
})
app.constant('tileLayers',{
    ggl: new L.TileLayer('http://mt0.googleapis.com/vt/lyrs=m@207000000&hl=ru&src=api&x={x}&y={y}&z={z}&s=Galile',{maxZoom: 18,minZoom:3}),
    osm: new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
})

app.service('map', function(tileLayers, $location, $rootScope){
    var s = this
    var map =  L.map('mapMap');
    this.map = map;




    function getLatLng(e){
       // $location.search('lat');
        //$location.replace();
        window.location.hash = '/param?lat='+map.getCenter().lat+'&lng='+map.getCenter().lng

    }
    function move(){
        map.addEventListener('move',getLatLng)
        $rootScope.$on('$locationChangeSuccess', function(){
            // console.log($location.search('lat'))
            s.latlng = [
                map.getCenter().lat,
                map.getCenter().lng
            ]
        })
    }

    this.move = move

})


app.factory('setMap', function($http, $timeout, map, tileLayers){
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
            map.move()
        },1000)
    }
    return getParam
})

app.factory('eventMove', function(map){
    var map = map.map
    function a(){
        console.log('sds')
    }

    return null
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
