app.factory('factoryGetOptions', function($timeout){
    var params = {};
    $timeout(function(){
        params.map = 'ggl'
        console.log('mess from factory ggl')
    },5000);

    return params

})