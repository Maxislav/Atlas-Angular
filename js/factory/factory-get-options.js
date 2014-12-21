app.factory('factoryGetOptions', function($timeout){
    var params = {};
    $timeout(function(){
        params.map = 'ggl';
        params.timeZone = '+2';
        params.zoom = 12;
        params.lat = 50.43;
        params.lng = 30.47;
        params.mouselat = null;
        params. mouselng = null
        console.log('mess from factory ggl')
    },2000);

    return params

})