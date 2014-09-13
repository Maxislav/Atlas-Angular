var map;
requirejs.config({
    baseUrl: '',
    paths: {
        app: 'js/app',
        jquery: 'lib/jquery/jquery-1.11.1',
        leaflet: 'lib/leaflet/leaflet',
        text: 'lib/require/text',
        tmpl: 'lib/jquery/jquery.tmpl.min',
        header: 'item/header.html',
        footer: 'item/footer.html'
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
    'text!header',
    'text!footer'
], function (header, footer) {
    app.init(header, footer)
})

