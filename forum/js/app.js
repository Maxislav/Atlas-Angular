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
    $scope.z='';
    $scope.post = function(){
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
    $scope.event = function () {
        alert('f')
    }
    $scope.yy = function () {
        console.log('d')
    }
    $scope.url = 'forum/html/noAuth.html';

    $scope.post = function(){
        $http.post('forum/php/isAuth', {mess: 'l'})
            .success(function (data, status, headers, config) {
                //callback(data)
            })
            .error(function (data, status, headers, config) {
                /* $scope.alertClass = 'show';
                 $scope.alertMess = 'Ошибка';
                 console.log(data)*/
                $scope.url = 'forum/html/isAuth.html'
            });
        $scope.yy = function () {
            console.log('d')
        }
    }


})
