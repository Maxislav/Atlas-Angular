var app = angular.module('app', []);


app.controller('events', function($scope, $http){
    $scope.login = "Login"
    $scope.pass = "Pass"
    $scope.classVhide = 'hide'
    $scope.loginin = $scope.helpin


    $scope.show = function(val , type){
        $scope.classVhide = 'show'
        $scope.helpin = val
        $scope.typehelp = type
    }
    $scope.hide = function(){
        $scope.classVhide = 'hide'
        $scope.helpin = null
    }

    $scope.change = function(val, type){
        $scope.typehelp = type
        $scope.helpin = val
    }

    $scope.post = function(){
        var data = {
            login: $scope.loginin,
            pass: $scope.passin ?md5($scope.passin): ''
        }
        $http.post('php/test.php', data)
            .success(function(data, status, headers, config){
                alert(data)
            })
            . error(function(data, status, headers, config) {
                alert('err')
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }


})

app.config( function( $httpProvider ) {    // [url]http://habrahabr.ru/post/181009/[/url]
        $httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformRequest = function( data ) {
            return angular.isObject( data ) && String( data ) !== '[object File]' ? angular.toParam( data ) : data;
        };
    });
