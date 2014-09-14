define(function(){
	return function(_el, _rowStrting, _descString){

		var el = null;
		var points = null;
		var rowStrting = null;
		var elsObj = {}
         var description;

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
            var tmpl = $.tmpl(_descString)
            el.append(tmpl)
            description = app.elements(tmpl)
            eventDesc()
		}

        function eventDesc(){
            description.title.on('click',function(){
                if(description.parms.height()){
                    description.parms.sizeTo(5,0)
                }else{
                    description.parms.sizeTo(5,el.height()/2)
                }
            })
        }

        this.resize = function(success){
            if(description.parms.height()){
                description.parms.sizeTo(5, 0, function(){
                    success && success()
                    description.parms.sizeTo(5,el.height()/2)
                })
            }else{
                success && success()
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
