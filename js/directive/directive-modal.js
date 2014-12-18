app.directive('modal', function(srvModal){
    return {
        restrict: 'E',
        templateUrl: srvModal.url,

        link: function(scope, el, attr){
          console.log('dsaa')
        }
    }
});
