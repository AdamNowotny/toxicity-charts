define(['d3', 'nvd3'], function (d3, nvd3) {

	var width = 900,
		height = 500,
		labelsHeight = 15,
		color = d3.scale.category10();

	function toxicityChart (selection) {
		selection.each(function(data, i) {
			var svg = selection
				.append("svg")
				.attr("width", width)
				.attr("height", height);
			var chart = nv.models.multiBarChart()
				.margin({top: 0, right: 0, bottom: labelsHeight, left: 40})
				.color(color.range())
				.showControls(false)
				.stacked(true)
				.xAxisEnabled(false);
			chart.yAxis.tickFormat(function (d) { return d3.round(d, 2); });
			selection.select('svg').transition().duration(500).call(chart);
		});
	}

	toxicityChart.width = function (value) {
		if (!arguments.length) return width;
		width = value;
		return toxicityChart;
	};

	toxicityChart.height = function (value) {
		if (!arguments.length) return height;
		height = value - labelsHeight;
		return toxicityChart;
	};

	return toxicityChart;

});