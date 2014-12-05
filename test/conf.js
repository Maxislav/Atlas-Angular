exports.config = {
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['/home/mars/www/AtlasRevolution/test/spec.js'],

	baseUrl: 'http://localhost:8000/',

	multiCapabilities:[
		{
			browserName:	'chrome',
			chromeOptions: {
				args: ['show-fps-counter=true']
			}
		}
//		{
//			browserName:	'phantomjs',
//			'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs',
//			'phantomjs.cli.args':[
//				'--loglevel=DEBUG'
//			]
//		}
	],
	framework: 'jasmine',

	rootElement: 'html', //где ng-app =

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
}