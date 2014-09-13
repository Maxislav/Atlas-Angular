define(function () {
    return function (_header) {
        var el = null;
        var listObj;
        var listZone;

        events()
        function init(success) {
            el = _header;
            listObj = el.find('.list-object')
            listZone = el.find('.list-zone')
            success && success()
        }

        function events() {
            if (!el) {
                init(events)
                return
            }
            el
                .on('click', '[name=objects]', function () {
                   vhide(listObj)
                })
                .on('click', '[name=zone]', function () {
                    vhide(listZone)
                })
        }

        function vhide(el) {
            if(el.is(':visible')){
                el.fadeTo(200, 0, function(){
                    el.css({
                        display: 'none'
                    })
                })
            }else{
                el.css({display: 'block'}).fadeTo(200, 1)
            }

        }


    }
})