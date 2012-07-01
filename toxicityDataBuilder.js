define(['jquery'], function ($) {

	var metrics = ['complexity', 'lines'];

	function convert (data) {
		var extractMetric = function (i, metricName) {
			var stackEntry = function (i, d) {
				return {
					x: i,
					y: d[metricName],
					name: d.name
				};
			};
			return {
				metric: metricName,
				values: $(data).map(stackEntry).toArray()
			};
		};

		return $(metrics).map(extractMetric).toArray();
	}

	return convert;

});