jQuery.fn.extend({
    sizeTo: function (a, toHeight, callback) {
        var el = this;
        el.each(function(){
            if(this.lmax){
                clearInterval(this.lmax)
            }
        })
        var startHeight = el.height()
        if (toHeight == startHeight) {
            callback && callback(this)
            return this
        }
        var t = 0;
        var v, vv, ss, s;
        el.each(function(){
            this
        })
        el.lmax = setInterval(start, 40)
        el.each(function(){
            this.lmax = el.lmax
        })
            function start() {
            if (startHeight < toHeight) {
                s = startHeight + a * t * t / 2
                el.height(s)
                v = a * t
                if (startHeight + (toHeight - startHeight) / 2 <= s) {
                    clearInterval(el.lmax)
                    startHeight = s
                    t = 0
                    el.lmax = setInterval(stop, 40)
                }

            } else {
                s = startHeight - a * t * t / 2
                el.height(s)
                v = a * t
                if (s <= startHeight + (toHeight - startHeight) / 2) {
                    clearInterval(el.lmax)
                    startHeight = s
                    t = 0
                    el.lmax = setInterval(stop, 40)
                }
            }
            t += 1
        }

        function stop() {
            t += 1
            if (startHeight < toHeight) {
                ss = startHeight + v * t - a * t * t / 2
                el.height(ss)
                vv = v - a * t
                if (toHeight <= ss) {
                    el.height(toHeight)
                    clearInterval(el.lmax)
                    callback && callback(this)
                }
            } else {
                ss = startHeight - v * t - a * t * t / 2
                el.height(ss)
                vv = v - a * t
                if (ss <= toHeight) {
                    el.height(toHeight)
                    clearInterval(el.lmax)
                    callback && callback(this)
                }
            }
        }
        return this
    }
})
