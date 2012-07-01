define(['d3'], function (d3) {

	var width = 900,
		height = 500,
		labelsHeight = 15,
		color = d3.interpolateRgb("#aad", "#556");

	function toxicityChart(selection) {
		selection.each(function(data, i) {
			var layersCount = data.length,
				barsCount = data[0].values.length,
					layersData = d3.layout.stack()
					.values(function(d) { return d.values; })
					(data),
				maxY = maxBarValue(layersData),
				x = function(d) { return d * width / barsCount;	},
				y0 = function(d) { return height - d.y0 * height / maxY; },
				y1 = function(d) { return height - (d.y + d.y0) * height / maxY; };

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
				.delay(function(d, i) { return i * 10; })
				.attr("y", y1)
				.attr("height", function(d) { return y0(d) - y1(d); });

			var labels = chart.selectAll("text.label")
				.data(layersData[0].values)
				.enter().append("text")
				.attr("class", "label")
				.attr("x", function (d, i) { return x(i); })
				.attr("y", height + 6)
				.attr("dx", x(0.45))
				.attr("dy", ".71em")
				.attr("text-anchor", "middle")
				.text(function(d, i) { return d.name; });
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