app.factory('factoryGetDevices', function ($timeout, $http) {
    var devices = [];


    var tempValue = [
        {
            'imei': '1111',
            text: 'Бервое устройство',
            phone: '439-32032',
            lat: 50.3,
            lng: 31.2,
            dateTime: 141217180502,
            satellites: 3
        },
        {
            'imei': '2222',
            text: 'Аторое устройство',
            phone: '439-32032',
            lat: 50.3,
            lng: 31.0,
            dateTime: 141217180334,
            satellites: 5
        }
    ]
    var isArray = angular.isArray;
    $http.post('php/get-devices.php', null)
        .success(function(d){
            console.log(d)
            if(isArray(d)){
                for (var i = 0; i < d.length; i++) {
                    devices.push(d[i]);
                }
            }
        })
        .error(function(d){
            console.log(d)
        })

   /* $timeout(function () {
        for (var i = 0; i < tempValue.length; i++) {
            devices.push(tempValue[i]);
        }
    }, 3000);*/
    return devices

})