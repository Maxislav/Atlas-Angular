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


forum.controller('v', function ($scope, $http) {
    $scope.tmpl = 'name'
    $scope.yy = function () {
        console.log('d')
    }
    $scope.url = 'forum/html/noAuth.html';
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
    }
    $scope.post = function () {
        var data = {
            login: $scope.row.loginin ? $scope.row.loginin :'',
            pass: $scope.row.passin ? md5($scope.row.passin) :''
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
            default :
        }
    }

    function isAuth(){
        $http.post('forum/php/isAuth.php', null)
            .success(function (data, status, headers, config) {
              //  console.log(data)
                callbackIsAuth(data)
            })
            .error(function (data, status, headers, config) {
                //console.log(data)
            });
    }
    isAuth();
    function callbackIsAuth(d){
        if (!d || !d.status){

            console.log(d)
            return
        }
        switch (d.status){
            case 'OK':
                $scope.row.loginin = d.name;
                $scope.url = 'forum/html/isAuth.html';
                break;
            default :
                $scope.url = 'forum/html/noAuth.html'

        }
    }
})

forum.config(function ($httpProvider) {    // [url]http://habrahabr.ru/post/181009/[/url]
    $httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? angular.toParam(data) : data;
    };
});
