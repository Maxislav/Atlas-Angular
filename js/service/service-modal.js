app.service('srvModal', function(){
    var arr = []
    var s = this;
    this.url = 'item/modal-exit.html';
    this.addModal = function (obj){
        arr.push({
            text:obj.text,
            buttons:(function(){
                var arrBut = []
                for(var i = 0; i<obj.buttons.length; i++){
                    arrBut.push({
                       text: obj.buttons[i].text,
                        action:  function(){
                            alert(i)

                           // obj.buttons[i].action
                        }

                    })

                }
                return arrBut
            })()//   obj.buttons
        })
        s.scope.show = true
        s.scope.modals = arr;
    }
})
