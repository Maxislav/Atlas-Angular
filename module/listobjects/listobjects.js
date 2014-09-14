define(function(){
	return function(_el, _rowStrting){

		var el = null;
		var points = null;
		var rowStrting = null;
		var elsObj = {}


		renderList()


		function init(){
			if(!points){
				getPoints()
				return
			}
			el = _el
			el.html('')
			rowStrting =_rowStrting
			renderList()
		}

		function renderList(){
			if(!el){
				init()
				return
			}
			for(var i=0; i<points.length; i++){
				var tmpl = $.tmpl(rowStrting,points[i])
				el.append(tmpl);
				elsObj[points[i].id] = tmpl
				event(tmpl)
			}
		}

		function event(el){
			el.on('click', function(){
				for(var i = 0 ; i <points.length; i++){
					elsObj[points[i].id].removeClass('active')


				}
				el.addClass('active')
			})
		}


		function getPoints(){
			points = [
				{
					id: 32,
					imei: 1111111,
					lat: 50.30,
					lng: 30.5,
					name: 'Tect'
				},
				{
					id: 33,
					imei: 22222,
					lat: 50.30,
					lng: 30.5,
					name: 'Tect2'
				}
			]
			init();
		}
	}
})
