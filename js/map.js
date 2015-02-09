var app = angular
    .module('app', ['ngAnimate', 'timer', 'calendarModule', 'ngDraggable'])
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
                    window.location = path;
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
        osm: new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        osmVelo: new L.TileLayer('http://a.tile.thunderforest.com/cycle/{z}/{x}/{y}.png'), // http://a.tile.thunderforest.com/cycle/16/38322/22116.png
        huma: new L.TileLayer('http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'), // http://a.tile.thunderforest.com/cycle/16/38322/22116.png
       // нuma‎: new L.TileLayer('http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'), // http://a.tile.openstreetmap.fr/hot/13/4792/2762.png
        mapia:  new L.tileLayer('http://{s}{hash}.wikimapia.org/?x={x}&y={y}&zoom={z}&r=7071412&type=&lng=1', {
            // Fix L.Util.template to use this
            hash: function (data) {
                return data.x % 4 + (data.y % 4) *4;
            }
            , subdomains : 'i'
            , maxZoom: 18
            , attribution: '<a href="http://wikimapia.org" target="_blank">Wikimapia.org</a>'
        })
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

        /*L.Popup = L.Class.extend({
            _updateContent: function () {
                if (!this._content) { return; }
                var con = this._content;
                if (typeof this._content === 'string') {
                    this._contentNode.innerHTML = this._content;
                } else if (angular.isElement(con)){
                    while (this._contentNode.hasChildNodes()) {
                        this._contentNode.removeChild(this._contentNode.firstChild);
                    }
                    this._contentNode.appendChild(this._content);
                }


                else {
                    while (this._contentNode.hasChildNodes()) {
                        this._contentNode.removeChild(this._contentNode.firstChild);
                    }
                    this._contentNode.appendChild(this._content);
                }
                this.fire('contentupdate');
            }
        })*/
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

        window.F = parseFloat;
        String.prototype.f = function(){return parseFloat(this)}
        //todo функция запрета передвижения контента
       /* document.ontouchmove = function(e) {
            e.preventDefault();
        }*/
    })





