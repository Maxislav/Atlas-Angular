var app = angular
    .module('app', ['ngAnimate', 'timer', 'calendarModule'])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformRequest = function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? angular.toParam(data) : data;
        };


        //Http Intercpetor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
    }])
    .factory('authHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
        return {
            response: function (response) {
                if (response.status === 401) {
                    console.log("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    // console.log("Response Error 401", rejection);
                    var path = window.location.origin + '/' + window.location.pathname.split('/')[1] + '/'
                    console.log(path)


                    window.location = path
                    // $location.path(path)
                }
                return $q.reject(rejection);
            }
        }
    }])
    .constant('windowSize', {
        width: window.innerWidth,
        height: window.innerHeight
    })
    .constant('tileLayers', {
        ggl: new L.TileLayer('http://mt0.googleapis.com/vt/lyrs=m@207000000&hl=ru&src=api&x={x}&y={y}&z={z}&s=Galile', {maxZoom: 18, minZoom: 3}),
        osm: new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    })

    .constant('timeZone', (function () {
        var a = [];
        for (var i = -23; i < 24; i++) {
            a.push({
                text: (i < 0) ? '' + i : '+' + i,
                value: i
            })
        }
        return a
    })())
    .service('map', function (tileLayers) {
        var map = L.map('mapMap', {dragging: false, closePopupOnClick: false});
        L.Icon.Default.imagePath = 'build/images';
        L.DivIcon = L.Icon.extend({
            createIcon: function (oldIcon) {
                var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
                    options = this.options;

                if (options.html !== false) {
                    if (angular.isElement(options.html)) {
                        div.appendChild(options.html[0])
                    } else {
                        div.innerHTML = options.html;
                    }


                } else {
                    div.innerHTML = '';
                }

                if (options.bgPos) {
                    div.style.backgroundPosition =
                        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
                }

                this._setIconStyles(div, 'icon');
                return div;
            }
        })
        this.map = map;
        this.lat = null
        this.scope = {};
        this.name = 'ddd'
    })
    .factory('hashLocation',function (map) {
        var lat, lng;

        function latlng() {
            lat = map.map.getCenter().lat.toFixed(6),
                lng = map.map.getCenter().lng.toFixed(6);
        }

        function setHash() {
            latlng();
            window.location.hash = '/param?lat=' + lat + '&lng=' + lng
        }

        function event() {
            map.map.on('dragend', setHash)
        }

        return {
            event: event
        }
    }).run(function () {
        var ws = new WebSocket('ws://192.168.65.73:8000/AtlasRevolution/php/web-socket.php');

// и навешивает на новый объект три колл-бека:

// первый вызовется, когда соединение будет установлено:
        ws.onopen =connectionOpen;

        function connectionOpen() {
            ws.send("Connection opened...");
        }


// второй - когда соединено закроется
        /*ws.onclose = function () {
            console.log("Connection closed...")
        };*/

// и, наконец, третий - каждый раз, когда браузер получает какие-то данные через веб-сокет
        ws.onmessage = function (evt) {
            console.log(evt.data)
        };

        console.log('dfsd')
    })





