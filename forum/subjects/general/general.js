forum.controller('general', function ($scope, dialog) {


      $scope.createSubject = function(){
         dialog.show({
             html: 'subjects/general/createsub.html',
             buttons: [
                 {
                     text: 'OK',
                     action: $scope.create
                 }
             ]
         })
      }



    $scope.create = function(){
       // alert('d')
        $scope.message = 'This is Show orders screen';
        dialog.dialogClass =''
    }
});