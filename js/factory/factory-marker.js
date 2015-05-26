app.factory('factoryMarker',function(factoryGetDevices, map, $compile){
    var f = parseFloat;
    var devices = factoryGetDevices;

    function divIcon(i){
        var template = '<marker name="'+factoryGetDevices[i].text+'" device="factoryGetDevices['+i+']"></marker>';
        var canvas = document.createElement('canvas')
        var linkFn = $compile(template);
        var content = linkFn(map.scope);

        var icon = L.divIcon({
            className: 'my-div',
            iconAnchor:[15,15],
            html: content
        });
        return icon
    }

    function marker(i){
        devices[i]._marker && map.map.removeLayer(devices[i]._marker);
        devices[i]._popup &&  map.map.removeLayer( devices[i]._popup );


        if(devices[i].lat && devices[i].lng ){
            devices[i]._marker = L.marker([f(devices[i].lat),f(devices[i].lng)],{icon: divIcon(i)}).addTo(map.map);
            devices[i]._popup = L.popup({offset:[0,-10],autoPan:false})
                .setLatLng([f(devices[i].lat),f(devices[i].lng)])
                .setContent( devices[i].text)
                .addTo(map.map);
        }

        return marker;
    }

    return {
        marker:marker
    }
});
