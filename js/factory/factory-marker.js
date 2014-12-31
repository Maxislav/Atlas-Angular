app.factory('factoryMarker',function(factoryGetDevices, map){
    var f = parseFloat;
    var devices = factoryGetDevices;

    function marker(i){
        devices[i]._marker && map.map.removeLayer(devices[i]._marker);
        devices[i]._popup &&  map.map.removeLayer( devices[i]._popup )
        devices[i]._marker = L.marker([f(devices[i].lat),f(devices[i].lng)]).addTo(map.map);
        devices[i]._popup = L.popup({offset:[0,-25]})
            .setLatLng([f(devices[i].lat),f(devices[i].lng)])
            .setContent( devices[i].text)
            .openOn(map.map);
        return marker;
    }

    return {
        marker:marker
    }
});
