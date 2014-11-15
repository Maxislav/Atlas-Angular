//Define an angular module for our app
var forum = angular.module('forum', ['ngRoute']);

forum.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'html/main.html',
                controller: 'main'
            })
            .when('/general', {
                templateUrl: 'subjects/general/general.html',
                controller: 'general'
            })
            .otherwise({
                redirectTo: '/main'
            });
    }]);

forum.service('dialog', function () {
    this.mess = "This is public";
})


forum.controller('main', function ($scope, $http) {

});




forum.controller('v', function ($scope, $http, dialog) {
    $scope.row = {
        entity: valid,
        val: ''
    };
    function valid(val) {
        var re = /[^(0-9)\w_]/g;
        $scope.row[val] = $scope.row[val].replace(re, '');
        if (20 < val.length) {
            $scope.row[val] = $scope.row[val].slice(0, 20)
        }
        $scope.alertMess = '';
    }

    $scope.post = function () {
        var data = {
            login: $scope.row.loginin ? $scope.row.loginin : '',
            pass: $scope.row.passin ? md5($scope.row.passin) : ''
        }
        $http.post('php/tryEnter.php', data)
            .success(function (data, status, headers, config) {
                console.log(data)
                callback(data)
            })
            .error(function (data, status, headers, config) {
                console.log(data)
            });
    }
    function callback(d) {
        switch (d) {
            case 'OK':
                $scope.url = 'html/isAuth.html';
                break;
            case  'NOT_EXIST':
                $scope.alertMess = 'Пользователь с таким именем не существует';
                break;
            case  'WRONG_PASS':
                $scope.alertMess = 'Пароль не верный';
                break;
            case  'ERR_INSERT_SQL':
                $scope.alertMess = 'Ошибка сервера';
                break;
            default :
                $scope.alertMess = 'Ukown error';
        }
    }

    $scope.tryExit = function () {
        dialog.action($scope.exit)
    }

    $scope.exit = function () {

        $http.post('php/exit.php', null)
            .success(function (data, status, headers, config) {
                console.log(data)
                callbackExit(data);
            })
            .error(function (data, status, headers, config) {
                console.log(data)
            });
        function callbackExit(d) {
            switch (d) {
                case 'OK':
                    $scope.url = 'html/noAuth.html'
                    break;
                default :
            }
        }
    }


    function isAuth() {
        $http.post('php/isAuth.php', null)
            .success(function (data, status, headers, config) {
                console.log(data.status)
                callbackIsAuth(data)
            })
            .error(function (data, status, headers, config) {
                console.log(data)
            });
    }

    isAuth();
    function callbackIsAuth(d) {
        if (!d || !d.status) {

            console.log(d)
            return
        }
        switch (d.status) {
            case 'OK':
                $scope.row.loginin = d.name;
                $scope.url = 'html/isAuth.html';
                break;
            default :
                $scope.url = 'html/noAuth.html'
        }
    }
})
forum.controller('global', function ($scope, $http, dialog) {

    dialog.action = function (success) {
        $scope.pattern = 'html/confirmExit.html'
        $scope.dialogClass = 'show'
        $scope.action = function (val) {
            switch (val) {
                case 'OK':
                    success();
                    $scope.pattern = '';
                    break;
                default :
                    $scope.pattern = '';
            }
            $scope.dialogClass = ''
        }
    };

    dialog.show = function(obj){
        $scope.pattern = obj.html
        $scope['done'] = function(){
            obj.buttons[0].action()
            $scope.dialogClass = ''
        }
        $scope.dialogClass = 'show'

        for(var opt in obj.params){
            $scope[opt] = obj.params['opt']
        }
    }


})


forum.config(function ($httpProvider) {    // [url]http://habrahabr.ru/post/181009/[/url]
    $httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? angular.toParam(data) : data;
    };
});
