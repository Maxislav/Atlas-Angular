app.factory('factoryGetOptions', function($timeout, $http){
    var params = {};
    $http.post('php/get-options.php',null)
        .success(function(d){
            params.map = d.mapType;
            params.timeZone = d.timeZone;
            params.zoom = d.startZoom;
            params.lat = d.startLat;
            params.lng = d.startLng;
            params.mouselat = null;
            params. mouselng = null;
            console.log('mess from factory ' + params.map)
        })
        .error(function(d){
            console.log('Error get opt '+d)
        })



/*
    $timeout(function(){
        params.map = 'ggl';
        params.timeZone = '+2';
        params.zoom = 12;
        params.lat = 50.43;
        params.lng = 30.47;
        params.mouselat = null;
        params. mouselng = null
        console.log('mess from factory ggl')
    },20);*/
    return params
})