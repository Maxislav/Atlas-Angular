app.factory('factoryMarker',function(factoryGetDevices, map){
    var f = parseFloat;
    var devices = factoryGetDevices;

    function marker(i){
        devices[i]._marker && map.map.removeLayer(devices[i]._marker);
        devices[i]._marker = L.marker([f(devices[i].lat),f(devices[i].lng)]).addTo(map.map)
        return marker;
    }

    return {
        marker:marker
    }
});
