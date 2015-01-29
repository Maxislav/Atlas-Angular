app.controller( 'graphContrl', [
	'$scope', 'factoryGetDevices', 'serviceReport', 'factoryGetOptions',
	function ( $scope, factoryGetDevices, serviceReport, factoryGetOptions ) {
		$scope.factoryGetDevices = factoryGetDevices;
		$scope.serviceReport = serviceReport;
		$scope.factoryGetOptions = factoryGetOptions;
		$scope.arrDeviceCoord = [];


		for ( var i = 0; i < $scope.factoryGetDevices.length; i++ ) {
			watchers( i )
		}

		function watchers( i ) {
			$scope.$watch( 'factoryGetDevices[' + i + ']._points', function ( val ) {
				toCoord( val, i )
			} );
			$scope.$watch( 'serviceReport.before', function ( val ) {
				console.log( val )
			} )
		}

		function toCoord( arr, _i ) {
			if ( !arr ) {
				return
			}
			var xx = window.innerWidth;
			var from = $scope.serviceReport.after.getTime();
			var to = $scope.serviceReport.before.getTime() + (3600 * 24 * 1000);
			var k = xx / (to - from);
			$scope.arrDeviceCoord[_i] = [];
			var koord = $scope.arrDeviceCoord[_i];
			for ( var i = 0; i < arr.length; i++ ) {
				koord[i] = {
					x: (k * (arr[i]._dateString - from)).toFixed( 0 ).f(),
					y: 100 - arr[i].speed.f()
				}
			}
			console.log( $scope.arrDeviceCoord[_i] );
		}
	}] );