define(['jquery'], function ($) {

	'use strict';

	var metrics = ['linesPerMethod', 'complexity', 'coupling'],
		descriptions = {
			linesPerMethod: 'Lines per method',
			complexity: 'Cyclomatic complexity',
			coupling: 'Class coupling'
		};

	function convert (data) {
		var metricLayer = function (i, metricName) {
			var stackEntry = function (i, d) {
				return {
					x: i,
					y: d[metricName],
					name: d.name
				};
			};
			return {
				metric: metricName,
				key: descriptions[metricName],
				values: $(data).map(stackEntry).toArray()
			};
		};

		return $(metrics).map(metricLayer).toArray();
	}

	return convert;
});