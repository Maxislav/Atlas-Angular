app.controller( 'graphContrl', [
	'$scope', 'factoryGetDevices', 'serviceReport', 'factoryGetOptions',
	function ( $scope, factoryGetDevices, serviceReport, factoryGetOptions ) {
		$scope.factoryGetDevices = factoryGetDevices;
		$scope.serviceReport = serviceReport;
		$scope.factoryGetOptions = factoryGetOptions;
		$scope.arrDeviceCoord = [];

        $scope.scalePlus = function(){

            $scope.serviceReport.scale = $scope.serviceReport.scale*2;
        }



		for ( var i = 0; i < $scope.factoryGetDevices.length; i++ ) {
			watchers( i )
		}

		function watchers( i ) {
			$scope.$watch( 'factoryGetDevices[' + i + ']._points', function ( val ) {
				toCoord( val, i )
			} );
			$scope.$watch( 'serviceReport.before', function ( val ) {
				console.log( val )
			} );
			$scope.$watch( 'factoryGetOptions.limitSpeed' , function(val){
				for (var i= 0; i<$scope.factoryGetDevices.length; i++){
					toCoord( $scope.factoryGetDevices[i]._points, i )
				}
			});
		}
        $scope.$watch('reportGraphWidth', function(val){
            for (var i= 0; i<$scope.factoryGetDevices.length; i++){
                toCoord( $scope.factoryGetDevices[i]._points, i );
            }
        });

		function toCoord( arr, _i ) {
			if ( !arr ) {
				return
			}
			var yy = $scope.reportGraphHeight;
			var xx = $scope.reportGraphWidth;
			var from = $scope.serviceReport.after.getTime();
			var to = $scope.serviceReport.before.getTime() + (3600 * 24 * 1000);
			var k = xx / (to - from);
			var ky = F(yy/$scope.factoryGetOptions.limitSpeed);
			$scope.arrDeviceCoord[_i] = [];
			var koord = $scope.arrDeviceCoord[_i];

            koord[0] = {
                x: (k * (arr[0]._dateString - from)).toFixed( 0 ).f(),
                y: yy
            };
			for ( var i = 0; i < arr.length; i++ ) {
				koord.push({
					x: (k * (arr[i]._dateString - from)).toFixed( 0 ).f(),
					y: yy - (ky*(arr[i].speed.f()))
				})
			};
            koord.push({
                x: (k * (arr[arr.length-1]._dateString - from)).toFixed( 0 ).f(),
                y: yy
            });
			console.log( $scope.arrDeviceCoord[_i] );
		}


        $scope.dragEnd = function(){
            alert('dd')
        }

	}] );