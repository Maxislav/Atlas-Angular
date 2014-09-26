define(function () {
	return function (_header, _content) {
		var el = null;
		var elObj = null;
		var listObj;
		var listZone;
		var mathGroup;
		var contentHeight = $(window).height()-50
        var listobjects;

		events()
		function init(success) {
			el = $('.index');
			elObj = app.elements(_header)

			require([
				'module/listobjects/listobjects',
				'text!module/listobjects/row.html',
                'text!module/listobjects/description.html',
				'text!module/listobjects/listobjects.html'
			],function(js, html, desc, listobj){
               // listobjects = 	new js(elObj.list, html, desc, listobj)
			})

			success && success()
		}

		function events() {
			if (!el) {
				init(events)
				return
			}
			elObj.btnObjects.on('click', function () {
				//vhide(elObj.list)
				controllerAction('list')
			})

			elObj.btnZone.on('click', function () {
				vhide(elObj.zone)
			})

			elObj.btnTrack.on('click', function () {
				vhide(elObj.track)
			})
		}

		function controllerAction(name){
			switch (name){
				case 'list':
					require([

					], function(){

					})
			}

		}

		function vhide(el) {

			if (el.is(':visible')) {
				el.fadeTo(200, 0, function () {
					el.css({
						display: 'none'
					})
					//resize()
				})
			} else {
				el.css({display: 'block'}).fadeTo(200, 1)
				//resize()
			}



		}
	}
})