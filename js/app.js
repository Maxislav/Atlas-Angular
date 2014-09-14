var app = new function () {
    var header, footer;
   // var html
    var headerString
    var footerString

    this.init = function (_header, _footer) {
        header = $('.header')
        footer = $('.footer')
        headerString = _header;
        footerString = _footer

        initScreen()
        initMap()
        renderHeader()
        renderFooter()


    }

    function initScreen() {
        var height = $(window).height()
        $('.index').height(height);
        $('.map').height(height)

    }


    function renderHeader() {
        header.html($.tmpl(headerString))
        require([
            'controller/header'
        ], function(js){
            new js(header)
        })
    }
    function renderFooter(){
        footer.html($.tmpl(footerString))
        require([
            'controller/footer'
        ],function(js){
            new js(footer)
        })
    }

    function initMap(){
        map = L.map('map').setView([50.39, 30.46], 14);
        L.tileLayer('http://otile3.mqcdn.com/tiles/1.0.0/{id}/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
            id: 'osm'
        }).addTo(map);

    }
    this.elements = function(el){
        var objEls = {}
        el.find('*').each(function(){
            if($(this).attr('name')){
                objEls[$(this).attr('name')] = $(this)
            }
        })
        if(el.attr('name')){
            objEls[el.attr('name')] = el
        }

        return objEls

    }
}