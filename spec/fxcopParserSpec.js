define([
	'fxcopParser',
	'text!fixtures/fxcopMetrics.xml'
	], function (parser, metricsXml) {
	describe ('fxcopParser', function () {
		
		it('should convert XML metrics file to json', function () {
			var json = parser(metricsXml);

			expect(json.length).toBe(1);
			expect(json[0].namespace).toBe('NUnit.Framework.Constraints');
			expect(json[0].name).toBe('AttributeConstraint');
			expect(json[0].lines).toBe(327);
			expect(json[0].linesPerMethod).toBe(9.9);
			expect(json[0].complexity).toBe(0);
			expect(json[0].coupling).toBe(0);
		});
	
	});
});