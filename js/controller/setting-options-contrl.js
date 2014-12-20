app.controller('settingOptionsContr', function (timeZone, srvModal,$timeout, map, $scope, factorySettingOptions, factoryGetOptions, tileLayers, factoryGetDevices) {


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

    $scope.checkboxChange = function(N, _id){
        for(var i= 0; i<$scope.checkbox.length; i++){
            if(i!=N){
                $scope.checkbox[i] = false
            }
        }
        if($scope.checkbox[N]){
            selectDevice = _id
        }else{
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

    $scope.$watch('data.map', function () {
        if ($scope.data && $scope.data.map) {
            $scope.setBaseLayer($scope.data.map)
        }
        console.log($scope.data && $scope.data.map)
    })
    $scope.$watch('data.timeZone', function () {
        console.log($scope.data.timeZone)
    })

    $scope.setBaseLayer = function (type) {
        tileLayers[type].addTo($scope.map)
        for (var opt in tileLayers) {
            if (opt != type) {
                $scope.map.removeLayer(tileLayers[opt])
            }
        }
    }
    $scope.delHttp = function(){
       $timeout(function(){
           for (var i =0; i< $scope.factoryGetDevices.length; i++){
               if($scope.factoryGetDevices[i].imei==selectDevice){
                   $scope.factoryGetDevices.splice(i,1);
                   selectDevice = null;
                   for(var i= 0; i<$scope.checkbox.length; i++){
                           $scope.checkbox[i] = false
                   }
               }
           }
       },2000)
    }

   $scope.delDevice = function(){
       if(!selectDevice) return;
       srvModal.addModal({
           text: 'Удалить устройство ' +selectDevice + '?' ,
           buttons: [
               {
                   text: 'Ok',
                   action: $scope.delHttp
               },
               {
                   text: 'No',
                   action: function(){}
               }

           ]
       })
   }
    $scope.httpAddDevise = function(){

    }

    $scope.addDevise = function(){
        $scope.factoryGetDevices.push({
            text: $scope.newDevice.text,
            imei: $scope.newDevice.imei,
            phone: $scope.newDevice.phone
        })
       for (var opt in $scope.newDevice){
           $scope.newDevice[opt] = null
       }
    }

    $scope.settingsDone = function(){
        console.log($scope.checkbox)
    }
})