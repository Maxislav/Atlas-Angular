describe('angularjs homepage', function() {
	it('should have a title', function() {
		browser.get('/AtlasRevolution');

		expect(browser.getTitle()).toEqual('Atlas');
	});
});