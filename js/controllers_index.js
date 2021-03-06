var app = angular.module('app', ['ngCookies']);
app.controller('events', function ($scope, $http, $cookies) {
    $scope.login = "Login"
    $scope.pass = "Pass"
    $scope.classVhide = 'hide'
    $scope.loginin = $scope.helpin
    $scope.lock = 'lock'
    $scope.loginin = ''
    $scope.passin = '';
    $cookies

    if($cookies.key){
        $http.post('php/isAuth.php')
            .success(function(d){
               if(d=='OK'){
                    window.location.href =window.location.origin+window.location.pathname+'map.html'
               }
            })
            .error(function(d){
                console.log(d)
            })
    }


    var timeout;
    $scope.show = function (val, type) {
        $scope.classVhide = 'show';
        $scope.helpin = val;
        $scope.typehelp = type
    };
    $scope.hide = function () {
        $scope.classVhide = 'hide';
        $scope.helpin = null
    };

    $scope.change = function (val, type) {
        $scope.typehelp = type;
        $scope.helpin = val;
        $scope.alertClass = 'hide';
        timeout = setTimeout(clear, 500);
    }
    function clear() {
        $scope.alertMess = ''
    }

    $scope.post = function () {

        var login = $scope.loginin;
        var pass = $scope.passin;

        if (!login || login.length < 4) {
            $scope.alertClass = 'show'
            $scope.alertMess = 'Имя пользователя должно содержать минимум 4 символа'
            return
        } else if (!pass || pass.length < 4) {
            $scope.alertClass = 'show'
            $scope.alertMess = 'Поле пароля должно содержать минимум 4 символа'
            return
        }
        var data = {
            login: login,
            pass: pass ? md5(pass) : ''
        }
        $http.post('php/tryEnter.php', data)
            .success(function (data, status, headers, config) {
                callback(data)
            })
            .error(function (data, status, headers, config) {
                $scope.alertClass = 'show';
                $scope.alertMess = 'Ошибка';
                console.log(data)
            });
        function callback(d){
            switch (d){
                case 'OK':
                    $scope.alertClass = 'show green'
                    $scope.alertMess = 'Успешный вход';
                    window.location.href = 'map.html';
                    break;
                case 'NOT_EXIST':
                    $scope.alertClass = 'show'
                    $scope.alertMess = 'Пользователь с таким именем не существует';
                    break;
                case 'WRONG_PASS':
                    $scope.alertClass = 'show'
                    $scope.alertMess = 'Пароль не верный';
                    break;
                default :
                    $scope.alertClass = 'show';
                    $scope.alertMess = 'Ошибка';
                    console.log(d)
            }
        }
    }
});

app.directive('valid', function(){
    return{
        restrict: 'A',
        link: function(scope, el, attr){
            scope.$watch(function() {
                if(scope.loginin && 4<=scope.loginin.length && scope.passin && 4<=scope.passin.length){
                  scope.lock = ''
                }else{
                    scope.lock = 'lock'
                }
            });
        }
    }
})



app.config(function ($httpProvider) {    // [url]http://habrahabr.ru/post/181009/[/url]
    $httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? angular.toParam(data) : data;
    };
});
