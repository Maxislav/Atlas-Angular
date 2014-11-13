//Define an angular module for our app
var forum = angular.module('forum', ['ngRoute']);

forum.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/main', {
                templateUrl: 'forum/html/main.html',
                controller: 'main'
            }).
            when('/noAuth', {
                templateUrl: 'forum/html/noAuth.html',
                controller: 'noAuth'
            }).
            otherwise({
                redirectTo: '/main'
            });
    }]);


forum.controller('main', function ($scope, $http) {
    $scope.message = 'This is Add new order screen';
    $scope.z = '';
    $scope.post = function () {
        $http.post('forum/php/isAuth', {mess: 'l'})
            .success(function (data, status, headers, config) {
                //callback(data)
            })
            .error(function (data, status, headers, config) {
                /* $scope.alertClass = 'show';
                 $scope.alertMess = 'Ошибка';
                 console.log(data)*/
                $scope.z = '5454'
            });
    }

    $scope.yy = function () {
        console.log('d')
    }
});


forum.controller('isAuth', function ($scope) {
    $scope.message = 'This is Show orders screen';
});

forum.factory('productService', function(){
    return  {
        mess: function(){
            alert('s')
        }
    }
})

forum.controller('v', function ($scope, $http, productService) {
    $scope.tmpl = 'name'
    $scope.yy = function () {
        console.log('d')
    }

    $scope.row = {
        entity: valid,
        val: ''
    };
    productService

    $scope.dialog = ''
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
        $http.post('forum/php/tryEnter.php', data)
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
                $scope.url = 'forum/html/isAuth.html';
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
    $scope.exit = function () {
        // $scope.alertEl.html('ddd')
        alert('d')
        //$scope.url = 'forum/html/noAuth.html'
        //  $scope.dialog = '<div ng-click="exit"></div>'
        /* $http.post('forum/php/exit.php', null)
         .success(function (data, status, headers, config) {
         console.log(data)
         callbackExit(data);
         })
         .error(function (data, status, headers, config) {
         console.log(data)
         });*/
        //  }
        callbackExit('OK')
        function callbackExit(d) {
            switch (d) {
                case 'OK':
                    $scope.url = 'forum/html/noAuth.html'
                    break;
                default :
            }
        }
    }


    function isAuth() {
        $http.post('forum/php/isAuth.php', null)
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
                $scope.url = 'forum/html/isAuth.html';
                break;
            default :
                $scope.url = 'forum/html/noAuth.html'
        }
    }
})
forum.controller('global', function ($scope, $http, productService) {
    $scope.tryExit = function () {
        $scope.confirmExit = 'forum/html/confirmExit.html'

    }
   // $scope.url = '';
   //
})
forum.directive('myAlertmess', function () {
    /* return function($scope, element, attrs){
     $scope.alertEl = element;
     }*/
    return {
        // controller: 'global',
        template: 'dd'
    }

})




forum.config(function ($httpProvider) {    // [url]http://habrahabr.ru/post/181009/[/url]
    $httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? angular.toParam(data) : data;
    };
});
