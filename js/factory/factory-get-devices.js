app.factory('factoryGetDevices', function ($timeout, $http, $interval) {
    var devices = [];

    devices.current = {};
    devices.timePost = null;
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

    function existEl(imei) {
        if (!imei) {
            return false
        }
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].imei == imei) {
                return true
            }
        }
        return false
    }

    function replaceParam(newObj) {
        for (var i = 0; i < devices.length; i++) {
            if (devices[i] && devices[i].imei && devices[i].imei == newObj.imei) {
                var devObj = devices[i];
                for (var opt in newObj) {
                    if (newObj[opt] != devObj[opt] && opt != 'phone' && opt != 'text' ) {
                        devObj[opt] = newObj[opt]
                        if(opt =='lng'){
                            console.log( devObj[opt])
                        }
                    }
                }
            }
        }
    }

    function reqParm() {
        $http.post('php/get-devices.php', null)
            .success(function (d) {
                devices.timePost = new Date().getTime();
                if (isArray(d)) {
                    for (var i = 0; i < d.length; i++) {
                        if (!existEl(d[i].imei)) {
                            devices.push(d[i]);
                        } else {
                            replaceParam(d[i])
                        }
                    }
                }
            })
            .error(function (d) {
                console.log(d)
            })
    }

    reqParm();
    $interval(reqParm, 5000);

    return devices

})