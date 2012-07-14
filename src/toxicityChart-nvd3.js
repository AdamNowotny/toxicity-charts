define(['d3', 'nvd3'], function (d3, nvd3) {

	'use strict';

	var width = 900,
		height = 500,
		labelsHeight = 15,
		color = d3.scale.category10();

	function toxicityChart (selection, fxcop) {
		selection.each(function(data, i) {
			var svg = selection
				.append("svg")
				.attr("width", width)
				.attr("height", height);
			var chart = nvd3.models.multiBarChart()
				.margin({top: 0, right: 0, bottom: labelsHeight, left: 40})
				.color(color.range())
				.showControls(false)
				.stacked(true)
				.tooltips(false);
			chart.yAxis.tickFormat(function (d) { return d3.round(d, 2); });
			chart.xAxis.ticks([]);
			selection.select('svg').transition().duration(500).call(chart);
			showStats(d3.select(this), fxcop.slice(0, 10));
		});
	}

	function showStats(selection, data) {
		var table = selection
			.append('div')
			.attr('class', 'stats')
			.append('table')
			.attr('class', 'table table-striped');
		table.append('col').attr('class', 'name');
		table.append('col').attr('class', 'toxicity');
		table.append('col').attr('class', 'lines');
		table.append('col').attr('class', 'lines-per-method');
		table.append('col').attr('class', 'complexity');
		table.append('col').attr('class', 'coupling');
		var thead = table.append("thead");
		thead.append("th").text("Class name").attr('class', 'name');
		thead.append("th").text("Toxicity").attr('class', 'toxicity');
		thead.append("th").text("Lines").attr('class', 'lines');
		thead.append("th");
		thead.append("th");
		thead.append("th");
		table.append('tbody').selectAll('tr')
			.data(data)
			.enter()
			.append('tr')
			.selectAll('td')
			.data(function (d, i) {
				return [ d.name, d.toxicity, d.lines, d.linesPerMethod, d.complexity, d.coupling ];
			})
			.enter()
			.append('td')
			.text(function (d, i) { return i === 0 ? d : d3.round(d, 2); })
			.attr('class', function (d, i) { return i === 0 ? null : 'number'; });
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