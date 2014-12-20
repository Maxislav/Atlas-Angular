app.directive('settingOptions', function(factorySettingOptions){
    return {
        restrict: 'C',
        templateUrl: 'item/setting-options.html',
        link: function(scope, el, attr){
            el.css('display','block')
        }
    }
})