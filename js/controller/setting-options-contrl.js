app.controller('settingOptionsContr', function (timeZone, $http, srvModal, $timeout, map, $scope, factorySettingOptions, factoryGetOptions, tileLayers, factoryGetDevices) {


    $scope.factorySettingOptions = factorySettingOptions;
    $scope.data = factoryGetOptions;
    $scope.factoryGetDevices = factoryGetDevices;

    $scope.selectMap = factoryGetOptions.map;
    $scope.timeZone = factoryGetOptions.timeZone;
    $scope.timeZones = timeZone;
    $scope.arrMapType = [];
    $scope.map = map.map;
    $scope.checkbox = [];
    $scope.newDevice = {};
    var selectDevice;
    $scope.settingsShow = function () {
        $scope.factorySettingOptions.show = !$scope.factorySettingOptions.show;
    }
    function empty(val) {

        if (!val) {
            return true;
        }

        if ((/^\s*$/).test(val)) {
            return true;
        }
        return false;
    }

    $scope.checkboxChange = function (N, _id) {
        for (var i = 0; i < $scope.checkbox.length; i++) {
            if (i != N) {
                $scope.checkbox[i] = false
            }
        }
        if ($scope.checkbox[N]) {
            selectDevice = _id
        } else {
            selectDevice = null
        }
    }


    function textMapDecode(map) {
        switch (map) {
            case 'ggl':
                return 'Google';
                break;
            case 'osm':
                return 'OSM'
                break;
            default :
                return 'Google'
        }
    }

    for (var opt in tileLayers) {
        $scope.arrMapType.unshift({
            map: opt,
            text: textMapDecode(opt)
        })
    }

    $scope.$watch('data.timeZone', function () {
        //console.log($scope.data.timeZone)
    })


    $scope.delHttp = function () {
        $timeout(function () {
            for (var i = 0; i < $scope.factoryGetDevices.length; i++) {
                if ($scope.factoryGetDevices[i].imei == selectDevice) {
                    $scope.factoryGetDevices.splice(i, 1);
                    selectDevice = null;
                    for (var i = 0; i < $scope.checkbox.length; i++) {
                        $scope.checkbox[i] = false
                    }
                }
            }
        }, 2000)
    }

    $scope.delDevice = function () {
        if (!selectDevice) return;
        srvModal.addModal({
            text: 'Удалить устройство ' + selectDevice + '?',
            buttons: [
                {
                    text: 'Ok',
                    action: $scope.delHttp
                },
                {
                    text: 'No',
                    action: function () {
                    }
                }
            ]
        })
    }
    $scope.httpAddDevise = function () {
        var data = {
            name: $scope.newDevice.text,
            imei: $scope.newDevice.imei,
            phone: $scope.newDevice.phone ? $scope.newDevice.phone : ''
        }
        $http.post('php/add-device.php', data)
            .success(function (d) {
                switch (d){
                    case 'OK':
                        $scope.factoryGetDevices.push({
                            text: $scope.newDevice.text,
                            imei: $scope.newDevice.imei,
                            phone: $scope.newDevice.phone
                        });
                        for (var opt in $scope.newDevice) {
                            $scope.newDevice[opt] = null
                        }
                        break;
                    case 'EXIST_CURRENT':
                        $scope.alertShow = 'show';
                        $scope.alertMess = 'Устройство зарегистрированно ранее';
                        clearAlert();
                        break;
                    case 'EXIST_OTHER':
                        $scope.alertShow = 'show';
                        $scope.alertMess = 'Устройство зарегистрированно на другого пользователя';
                        clearAlert();
                        break;

                }
                console.log(d);
            })
            .error(function (d) {
                console.log(d);
            })

    }
    function clearAlert() {
        $timeout(function () {
            $scope.alertShow = ''
            $scope.alertMess = ''
        }, 7000)
    }

    $scope.addDevise = function () {
        if (empty($scope.newDevice.imei)) {
            $scope.alertShow = 'show'
            $scope.alertMess = 'Идентификатор устройства должен быть определен'
            clearAlert();
            return;
        }
        if ($scope.newDevice.imei && $scope.newDevice.imei.length < 10) {
            $scope.alertShow = 'show'
            $scope.alertMess = 'Идентификатор устройства должен содержать не менее 10 цифр'
            clearAlert();
            return;
        }
        if (empty($scope.newDevice.text)) {
            $scope.alertShow = 'show'
            $scope.alertMess = 'Имя устройства не может быть пустым'
            clearAlert();
            return;
        }
        $scope.httpAddDevise();

        /*
         $scope.factoryGetDevices.push({
         text: $scope.newDevice.text,
         imei: $scope.newDevice.imei,
         phone: $scope.newDevice.phone
         })
         for (var opt in $scope.newDevice) {
         $scope.newDevice[opt] = null
         }*/
    }

    $scope.settingsDone = function () {
        console.log($scope.checkbox)
    }
})