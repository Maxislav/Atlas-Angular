var app = angular.module('app', []);


app.controller('events', function($scope, $http){
    var timeout;

    $scope.login = "Login"
    $scope.pass = "Pass"
    $scope.classVhide = 'hide'
    $scope.confirm = 'Confirm'
    $scope.loginin = $scope.helpin;
    $scope.alertClass = 'hide'

    $scope.alertMess = 'Err '


    $scope.show = function(val , type){
        $scope.classVhide = 'show'
        $scope.helpin = val
        $scope.typehelp = type
    }
    $scope.hide = function(){
        $scope.classVhide = 'hide'
        $scope.helpin = null
    }


    $scope.validLogin = function(){
        var re = /[^0-9]/g;

    }
    $scope.change = function(val, type){
        $scope.typehelp = type
        $scope.helpin = val
        $scope.alertClass = 'hide'
        timeout && clearTimeout(timeout)
        timeout = setTimeout(function(){
            $scope.alertMess = 'err'
        }, 500)
    }

    $scope.post = function(){
        var login = $scope.loginin;
        var pass = $scope.passin;
        var confirm = $scope.confirmin;

        if(!login || login.length<4){
            $scope.alertClass = 'show'
           $scope.alertMess = 'Имя пользователя должно содержать минимум 4 символа'
           // return
        }else if (!pass || pass.length<4){
            $scope.alertClass = 'show'
            $scope.alertMess = 'Поле пароля должно содержать минимум 4 символа'
           // return
        }else if(pass!=confirm){
            $scope.alertClass = 'show'
            $scope.alertMess = 'Подтверждение пароля не совпадает '
          //  return
        }

        var data = {
            login: $scope.loginin,
            pass: $scope.passin ?md5($scope.passin): ''
        }
        $http.post('php/regist.php', data)
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
