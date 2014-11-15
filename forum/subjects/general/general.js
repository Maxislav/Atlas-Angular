forum.controller('general', function ($scope, dialog, Data) {
    $scope.data = Data;
    $scope.message = 'dd'
      $scope.createSubject = function(){
         dialog.show({
             html: 'subjects/general/createsub.html'
         })
      }

    $scope.data.done = function(){
       //alert($scope.data.subj )
        dialog.hide()
    }
    $scope.data.cancel = function(){
        dialog.hide()
        $scope.data.subj = null
    }

    $scope.showModal = true
    $scope.toggleModal = function(){
        $scope.showModal =true
    };



    $scope.create = function(){
       // alert('d')
        $scope.message = 'This is Show orders screen';
        dialog.dialogClass =''
    }

});