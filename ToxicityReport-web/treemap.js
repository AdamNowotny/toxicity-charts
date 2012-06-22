var treemap = function () {

	var namespaceColorScale = d3.scale.linear().range(['white', 'black']),
		classColor = d3.scale.linear().range(['white', 'red', 'black']),
		selector = '#chart',
		buttonSelector = '.navigation button',
		maxMetric = {
			lines: 500,
			linesPerMethod: 30,
			complexity: 10,
			coupling: 10
		};

	var treemap = d3.layout.treemap()
		.value(function (d) { return d.lines; })
		.padding(function (d) {
			var top = d.children ? 13 : 3;
			return [top, 3, 3, 3];
		});

	var content = function (metricName) {
		return function (d) {
			var metricValue = d[metricName];
			return d.children ? d.name : escape(d.name) + '<br/>' + metricValue;
		};
	};

	var updateTreemap = function (metricName, /* optional */data) {
		var width = window.innerWidth - 20,
			height = window.innerHeight - 60;
		data = data || d3.select(selector).data();

		treemap.size([width, height]);
		var chart = d3.select(selector)
			.data(data)
			.style('width', width + 'px')
			.style('height', height + 'px')
			.selectAll('div')
			.data(treemap.nodes)
			.html(content(metricName));
		chart.transition()
			.duration(1500)
			.style('background', function (d) { return cellColor(d, metricName); })
			.style('color', function (d) { return cellTextColor(d, metricName); })
			.call(cell);
		chart.enter().append('div')
			.attr('class', 'cell')
			.style('background', function (d) { return cellColor(d, metricName); })
			.style('color', function (d) { return cellTextColor(d, metricName); })
			.html(content(metricName))
			.transition()
			.call(cell);
		chart.exit().remove();
	};

	var update = function (json) {
		// need to reset cached state when switching datasets with a sticky layout
		treemap.sticky(true);
		namespaceColorScale.domain([0, getDepth(json)]);
		d3.selectAll(selector).html('');
		updateTreemap('lines', [json]);
		attachButtons();
	};

	var getDepth = function (json) {
		if (!json.children) return 0;
		var maxChildDepth = 0;
		for (var i = 0; i < json.children.length; i++) {
			var childDepth = getDepth(json.children[i]);
			maxChildDepth = Math.max(maxChildDepth, childDepth);
		}
		return maxChildDepth + 1;
	};

	var attachButtons = function () {
		d3.selectAll(buttonSelector).on('click', function () {
			var activateButton = function (name) {
				d3.selectAll(buttonSelector).classed('active', function () {
					return this.id == name;
				});
			};
			updateTreemap(this.id);
			activateButton(this.id);
		});
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

	return {
		update: update
	}

} ();