app.controller('headCntrl', function($scope, srvModal){
    $scope.item = {};
    $scope.show = function(name){
        $scope.item[name] = ($scope.item[name] == 'show') ? '': 'show'
    }
    $scope.exitHttp = function(){
        alert('ddss')
    }

    $scope.exit = function(){
        srvModal.addModal({
            text: 'Выйти?',
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
})