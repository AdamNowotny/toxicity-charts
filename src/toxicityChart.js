define(['d3'], function (d3) {

	var width = 900,
		height = 500,
		labelsHeight = 15,
		color = d3.scale.category10();

	function toxicityChart(selection) {
		selection.each(function(data, i) {
			var layersCount = data.length,
				barsCount = data[0].values.length,
					layersData = d3.layout.stack()
					.values(function(d) { return d.values; })
					.order('reverse')
					(data),
				maxY = maxBarValue(layersData),
				x = function(d) { return d * width / barsCount;	},
				y0 = function(d) { return height - d.y0 * height / maxY; },
				y1 = function(d) { return height - (d.y + d.y0) * height / maxY; };

			var legend = d3.select('.toxicity.legend')
				.append('ul')
				.selectAll('li')
				.data(data)
				.enter()
				.append('li')
				.text(function (d, i) { return d.displayMetric; })
				.style("color", function(d, i) { return color(i / (layersCount - 1)); });

			var chart = d3.select(this)
				.append("svg")
				.attr("width", width)
				.attr("height", height + labelsHeight);

			var layers = chart.selectAll("g.layer")
				.data(layersData)
				.enter().append("g")
				.style("fill", function(d, i) { return color(i / (layersCount - 1)); })
				.attr("class", "layer");

			var bars = layers.selectAll("g.bar")
				.data(function(d) { return d.values; })
				.enter().append("g")
				.attr("class", "bar")
				.attr("transform", function(d) { return "translate(" + x(d.x) + ",0)"; });

			bars.append("rect")
				.attr("width", x(0.9))
				.attr("x", 0)
				.attr("y", height)
				.attr("height", 0)
				.transition()
				.duration(1000)
				.attr("y", y1)
				.attr("height", function(d) { return y0(d) - y1(d); });
		});
	}

	function maxBarValue (data) {
		return d3.max(data, function(d) {
			return d3.max(d.values, function(d) {
				return d.y0 + d.y;
			});
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