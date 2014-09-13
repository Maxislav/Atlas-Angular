define(function(){
    return function(_footer){
        var el = _footer

       var elObj = app.elements(el)

        map.on('mousemove', function(e){
            var lat = e.latlng.lat.toFixed(5)
            var lng = e.latlng.lng.toFixed(5)
            elObj.lat.html(lat)
            elObj.lng.html(lng)

        })
    }
})