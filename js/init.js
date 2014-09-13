var map;
requirejs.config({
    baseUrl: '',
    paths: {
        app: 'js/app',
        jquery: 'lib/jquery/jquery-1.3.2.min',
        leaflet: 'lib/leaflet/leaflet',
        text: 'lib/require/text',
        tmpl: 'lib/jquery/jquery.tmpl.min',
        header: 'item/header.html'
    },
    shim: {

        tmpl: {
            deps: [
                'jquery'
            ]
        },
        'text!header': {
            deps: [
                'jquery',
                'leaflet',
                'tmpl',
                'text',
                'app'
            ]
        }
    }
})


require([
    'text!header'
], function (html) {
    app.init(html)
})

