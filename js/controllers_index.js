var app = angular.module('app', []);

app.controller('events', function($scope){
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


})


