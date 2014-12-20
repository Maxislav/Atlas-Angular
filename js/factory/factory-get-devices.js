app.factory('factoryGetDevices', function($timeout){
    var devices = [];

    var tempValue = [
        {
           '_id':'1111',
            text: 'Бервое устройство',
            phone: '439-32032'
        },
        {
            '_id':'2222',
            text: 'Аторое устройство',
            phone: '439-32032'
        }
    ]

    $timeout(function(){
       for (var i = 0; i < tempValue.length; i++){
           devices.push(tempValue[i])
       }

    }, 5000);
    return devices

})