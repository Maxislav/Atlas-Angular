var app = new function () {
    var header;
    var html

    this.init = function (_html) {
        header = $('.header')
        html = _html;
        initScreen()
        renderHeader()
        initMap()

    }

    function initScreen() {
        var height = $(window).height()
        $('.index').height(height);
        $('.map').height(height)

    }


    function renderHeader() {

        header.html($.tmpl(html))
    }

    function initMap(){
        var map = L.map('map').setView([50.39, 30.46], 14);
        L.tileLayer('http://otile3.mqcdn.com/tiles/1.0.0/{id}/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'osm'
        }).addTo(map);


    }
}