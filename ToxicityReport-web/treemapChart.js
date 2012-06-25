var treemapChart = function () {

	var width = 700,
		height = 400,
		namespaceColorScale = d3.scale.linear().range(['white', 'black']),
		classColor = d3.scale.linear().range(['white', 'red', 'black']),
		metric = 'lines',
		maxMetric = {
			lines: 500,
			linesPerMethod: 30,
			complexity: 10,
			coupling: 10
		},
		currentSelection = null;

	var treemapLayout = d3.layout.treemap()
		.value(function (d) { return d.lines; })
		.sticky(true)
		.padding(function (d) {
			var top = d.children ? 13 : 3;
			return [top, 3, 3, 3];
		});

	function treemapChart(selection) {
		if (selection != currentSelection) {
			currentSelection = selection;
			// need to reset cached state when switching datasets with a sticky layout
			treemapLayout.sticky(true);
		}
		treemapLayout.size([width, height]);
		currentSelection.each(function (d, i) {
			var chart = d3.select(this).style('width', width + 'px')
				.style('height', height + 'px')
				.selectAll('div')
				.data(treemapLayout.nodes)
				.html(content(metric));
			chart.transition()
				.duration(1500)
				.style('background', function (d) { return cellColor(d, metric); })
				.style('color', function (d) { return cellTextColor(d, metric); })
				.call(cell);
			chart.enter().append('div')
				.attr('class', 'cell')
				.style('background', function (d) { return cellColor(d, metric); })
				.style('color', function (d) { return cellTextColor(d, metric); })
				.html(content(metric))
				.transition()
				.call(cell);
			chart.exit().remove();
		});
	};

	treemapChart.metric = function (value) {
		if (!arguments.length) return metric;
		metric = value;
		return treemapChart;
	};

	treemapChart.selection = function (value) {
		if (!arguments.length) return selection;
		selection = value;
		return treemapChart;
	};

	treemapChart.depth = function (value) {
		if (!arguments.length) return depth;
		depth = value;
		namespaceColorScale.domain([0, depth]);
		return treemapChart;
	};

	treemapChart.width = function (value) {
		if (!arguments.length) return width;
		width = value;
		return treemapChart;
	};

	treemapChart.height = function (value) {
		if (!arguments.length) return height;
		height = value;
		return treemapChart;
	};

	var content = function (metricName) {
		return function (d) {
			var metricValue = d[metricName];
			return d.children ? d.name : escape(d.name) + '<br/>' + metricValue;
		};
	};

	var cellColor = function (d, metricName) {
		var max = maxMetric[metricName];
		var color = classColor.domain([0, max, max * 4])(d[metricName]);
		var borderColor = namespaceColorScale(d.depth);
		return d.children ? borderColor : color;
	};

	var cellTextColor = function (d, metricName) {
		var max = maxMetric[metricName];
		var color = d[metricName] > max ? 'white' : 'black';
		return d.children ? "white" : color;
	};

	var cell = function () {
		this
		  .style('left', function (d) { return d.x + 'px'; })
		  .style('top', function (d) { return d.y + 'px'; })
		  .style('width', function (d) { return Math.max(0, d.dx - 1) + 'px'; })
		  .style('height', function (d) { return Math.max(0, d.dy - 1) + 'px'; });
	}

	return treemapChart;

};