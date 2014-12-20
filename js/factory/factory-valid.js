app.factory('factoryValid', function(){
    var valid = {
        int: function(text){
            var t =  text.replace(/[^0-9]/g, '');
            return t
        }

    }
    return valid

})
