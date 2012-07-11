define(['jquery', 'navigation'], function ($, navigation) {

	'use strict';
	
	describe('navigation', function () {

		var callback = jasmine.createSpy();
		
		beforeEach(function () {
			loadFixtures('menu.html');
			navigation.chartChanged(callback)();
		});

		it('should activate default chart on update', function () {
			navigation.update();

			expect(callback).toHaveBeenCalledWith('treemap', 'lines');
		});

		it('should activate selected chart after click', function () {
			$("#toxicity").click();

			expect(callback).toHaveBeenCalledWith('toxicity', null);
		});
		
		it('should activate current chart after update', function () {
			$("#toxicity").click();

			navigation.update();

			expect(callback).toHaveBeenCalledWith('toxicity', null);
		});

	});
});