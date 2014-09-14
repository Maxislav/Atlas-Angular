define(function () {
	return function (_header) {
		var el = null;
		var elObj = null;
		var listObj;
		var listZone;
		var mathGroup;
		var contentHeight = $(window).height()-50

		events()
		function init(success) {
			el = _header;
			elObj = app.elements(_header)

			mathGroup = [
				elObj.zone,
				elObj.list,
				elObj.track
			]
			require([
				'module/listobjects/listobjects',
				'text!module/listobjects/row.html'
			],function(js, html){
				new js(elObj.list, html)
			})

			success && success()
		}

		function events() {
			if (!el) {
				init(events)
				return
			}

			elObj.btnZone.on('click', function () {
				vhide(elObj.zone)
			})
			elObj.btnObjects.on('click', function () {
				vhide(elObj.list)
			})
			elObj.btnTrack.on('click', function () {
				vhide(elObj.track)
			})
		}

		function vhide(el) {
			if (el.is(':visible')) {
				el.fadeTo(200, 0, function () {
					el.css({
						display: 'none'
					})
					resize()
				})
			} else {
				el.css({display: 'block'}).fadeTo(200, 1)
				resize()
			}
			function resize(){
				var c = 0
				for(var i = 0; i<mathGroup.length; i++){
					if(mathGroup[i].is(':visible')){
						c++
					}
				}
				for(var i = 0; i<mathGroup.length; i++){
					if(mathGroup[i].is(':visible')){
						mathGroup[i].height(contentHeight/c)
					}
				}
			}
		}
	}
})