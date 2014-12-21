app.factory('factoryGetDevices', function ($timeout, factoryGetOptions) {
    var devices = [];
    var params = factoryGetOptions;


    var tempValue = [
        {
            'imei': '1111',
            text: 'Бервое устройство',
            phone: '439-32032',
            lat: 50.3,
            lng: 31.2,
            dateTime: 141217180302
        },
        {
            'imei': '2222',
            text: 'Аторое устройство',
            phone: '439-32032',
            lat: 50.3,
            lng: 31.0,
            dateTime: 141217180302
        }
    ]



    $timeout(function () {
        for (var i = 0; i < tempValue.length; i++) {
            devices.push(tempValue[i]);

        }
        //rfacto();
    }, 5000);
    return devices

})