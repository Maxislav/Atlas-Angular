app.controller('headContrl', function ($scope, srvModal, factorySettingOptions, $http) {
    $scope.item = {};
    $scope.factorySettingOptions = factorySettingOptions

    $scope.show = function (name) {
        $scope.item[name] = ($scope.item[name] == 'show') ? '' : 'show'
    }
    $scope.exitHttp = function () {
        $http.post('php/exit.php')
            .success(function (d) {
                switch (d.status){
                    case 'OK':
                        window.location = d.path;
                        break;
                    default :
                        console.log(d)
                }
            })
            .error(function (d) {
                console.log(d);
            })
    }

    $scope.exit = function () {
        srvModal.addModal({
            text: 'Выйти из системы?',
            buttons: [
                {
                    text: 'Ok',
                    action: $scope.exitHttp
                },
                {
                    text: 'No'
                }
            ]
        })
    }

    $scope.settingsShow = function () {
        $scope.factorySettingOptions.show = !$scope.factorySettingOptions.show;
    }
})