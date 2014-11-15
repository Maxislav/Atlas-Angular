forum.controller('general', function ($scope, dialog, Data) {

    $scope.message = 'dd'
      $scope.createSubject = function(){
         dialog.show({
             html: 'subjects/general/createsub.html',
             buttons: [
                 {
                     text: 'OK',
                     action: $scope.create
                 }
             ],
             params:{
                 message : $scope.message
             },
             scope: $scope

         })
      }

    $scope.data = Data;
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