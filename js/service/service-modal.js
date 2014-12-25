app.service('srvModal', function () {
    var arr = [];
    var N = 0;
    var s = this;
    this.url = 'item/modal-exit.html';
    function setArray(obj, n) {
        var arr = [];
        var _arr = obj.buttons
        for (var i = 0; i < _arr.length; i++) {
            add(i)
        }
        function add(_i) {
            var i = _i
            arr[i] = {
                text: _arr[i].text,
                action: function () {
                    delModal(n)
                    _arr[i].action && _arr[i].action()
                }
            }
        }
        return arr
    }
    function delModal(n) {
        for (var i = 0; i < arr.length; i++) {
            if (n == arr[i].$N) {
                arr.splice(i, 1)
                if(arr.length==0){
                    s.maskScope.show= false
                }
                break
            }
        }
    }
    this.addModal = function (_obj) {
        s.maskScope.show= true
        var obj = {};
        obj.buttons = [];
        obj.close = (function(){
           var n = N;
           return function(){
               delModal(n)
           }
        })();
        obj.text = _obj.text
        obj.buttons = setArray(_obj, N);
        obj.$N = N;
        arr.unshift(obj)
        s.scope.show = true
        s.scope.modals = arr;
        N++;
    }
})

