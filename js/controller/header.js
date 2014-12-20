app.controller('headCntrl', function($scope, srvModal, factorySettingOptions){
    $scope.item = {};
    $scope.factorySettingOptions = factorySettingOptions

    $scope.show = function(name){
        $scope.item[name] = ($scope.item[name] == 'show') ? '': 'show'
    }
    $scope.exitHttp = function(){
       // alert('From header cntrl')
    }

    $scope.exit = function(){
        srvModal.addModal({
            text: 'Выйти из системы?',
            buttons: [
                {
                    text: 'Ok',
                    action: $scope.exitHttp
                },
                {
                    text: 'No',
                    action: $scope.exitHttp
                }

            ]
       })
    }

    $scope.settingsShow = function(){
        $scope.factorySettingOptions.show = !$scope.factorySettingOptions.show;
    }
})