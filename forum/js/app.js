//Define an angular module for our app
var forum = angular.module('forum', ['ngRoute']);

forum.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/isAuth', {
                templateUrl: 'forum/html/isAuth.html',
                controller: 'isAuth'
            }).
            when('/noAuth', {
                templateUrl: 'forum/html/noAuth.html',
                controller: 'noAuth'
            }).
            otherwise({
                redirectTo: '/noAuth'
            });
    }]);


forum.controller('noAuth', function ($scope, $http) {
    $scope.message = 'This is Add new order screen';
    $http.post('forum/php/isAuth', {mess: 'l'})
        .success(function (data, status, headers, config) {
            //callback(data)
        })
        .error(function (data, status, headers, config) {
            /* $scope.alertClass = 'show';
             $scope.alertMess = 'Ошибка';
             console.log(data)*/
        });
    $scope.yy = function () {
        console.log('d')
    }
});


forum.controller('isAuth', function ($scope) {
    $scope.message = 'This is Show orders screen';
});


forum.controller('v', function ($scope) {
    $scope.tmpl = 'name'
    $scope.event = function () {
        alert('f')
    }
    $scope.yy = function () {
        console.log('d')
    }
})


forum.directive('myCustomer', function () {
    return  function ($scope, element) {
        element.on('change',$scope.yy)
    }
})

