describe('angularjs homepage', function () {
	it('Тест', function () {
		browser.get('http://localhost:8000/AtlasRevolution/');

		element(by.model('yourName')).sendKeys('Julie');

		var greeting = element(by.binding('yourName'));

		expect(greeting.getText()).toEqual('Hello Julie!');
	});


});
