forum.controller('general', function ($scope, dialog, Data, $http) {
    $scope.data = Data;
    $scope.message = 'dd';
    $scope.createSubject = function () {
        dialog.show({
            html: 'subjects/general/createsub.html'
        })
    };

    $scope.data.done = function () {
        //alert($scope.data.subj )
        req()
        dialog.hide()
    };

    $scope.data.cancel = function () {
        dialog.hide()
        $scope.data.subj = null
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