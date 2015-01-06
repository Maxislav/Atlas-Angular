app.directive('report', function(serviceShowElements){
    return{
        restrict: 'C',
        templateUrl: 'item/report.html',
        link: function(scope, el, attr){
            el.css('display','inherit')
        }
    }
})
