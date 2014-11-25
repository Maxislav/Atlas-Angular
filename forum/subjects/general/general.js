forum.controller('general', function ($scope, dialog, Data, $http, $compile) {
    $scope.data = Data;
    $scope.message = 'dd';
    $scope.m = {
        message: ''
    }

    $scope.el
    $scope.createSubject = function () {
        var template = angular.element('<div  class="dialog show"><div class="mask" ng-include="creatSubUrl"></div></div>');
        var linkFn = $compile(template);
        $scope.el = linkFn($scope);
        document.body.appendChild( $scope.el[0])
    };


    $scope.creatSubUrl = 'subjects/general/createsub.html'

    if($scope.data.auth){
        $scope.url = 'subjects/general/buttoncreate.html'
    }else{
        $http.post('php/isAuth.php', null)
            .success(function (data, status, headers, config) {
                console.log(data.status)
                callbackIsAuth(data)
            })
            .error(function (data, status, headers, config) {
                console.log(data)
            });
        function callbackIsAuth(d) {
            if (!d || !d.status) {

                console.log(d)
                return
            }
            switch (d.status) {
                case 'OK':
                    $scope.data.auth = true;
                    break;
                default :
                    $scope.data.auth = false;
            }
            $scope.data.action()
        }
    }
    $scope.data.action = function(){
        if( $scope.data.auth){
            $scope.url = 'subjects/general/buttoncreate.html'
        }else{
            $scope.url = null
        }
    }

    $scope.data.done = function () {
        //alert($scope.data.subj )
        req()
        dialog.hide()
    };

    $scope.cancel = function () {
        document.body.removeChild($scope.el[0]) ;
    };

    $scope.showModal = true
    $scope.toggleModal = function () {
        $scope.showModal = true
    };

    $scope.create = function () {
        // alert('d')
        $scope.message = 'This is Show orders screen';
        dialog.dialogClass = ''
    };

    function req() {
        var data = {
            section: 'general',
            subject: $scope.data.subject ? $scope.data.subject : '',
            message: $scope.data.message ? $scope.data.message : ''
        };

        $http.post('php/createSubj.php', data)
            .success(function (data, status, headers, config) {
                console.log(data)
                // callbackIsAuth(data)
            })
            .error(function (data, status, headers, config) {
                console.log(data)
            });
    };

});