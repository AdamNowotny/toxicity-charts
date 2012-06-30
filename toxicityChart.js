define(['d3'], function (d3) {

	var width = 900,
		height = 500,
		labelsHeight = 15,
		color = d3.interpolateRgb("#aad", "#556"),
		chart = null;

	function toxicityChart(selection) {
		selection.each(function(d,i) {
			chart = d3.select(this)
				.append("svg")
				.attr("width", width)
				.attr("height", height + labelsHeight);

			var layers = chart.selectAll("g.layer")
				.data(data)
				.enter().append("g")
				.style("fill", function(d, i) { return color(i / (n - 1)); })
				.attr("class", "layer");

			var bars = layers.selectAll("g.bar")
				.data(function(d) { return d; })
				.enter().append("g")
				.attr("class", "bar")
				.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });

			bars.append("rect")
				.attr("width", x({x: 0.9}))
				.attr("x", 0)
				.attr("y", height)
				.attr("height", 0)
				.transition()
				.delay(function(d, i) { return i * 10; })
				.attr("y", y1)
				.attr("height", function(d) { return y0(d) - y1(d); });

			var labels = chart.selectAll("text.label")
				.data(data[0])
				.enter().append("text")
				.attr("class", "label")
				.attr("x", x)
				.attr("y", height + 6)
				.attr("dx", x({x: 0.45}))
				.attr("dy", ".71em")
				.attr("text-anchor", "middle")
				.text(function(d, i) { return i; });

			chart.append("line")
				.attr("x1", 0)
				.attr("x2", width - x({x: 0.1}))
				.attr("y1", height)
				.attr("y2", height);
		});
	}

	toxicityChart.width = function (value) {
		if (!arguments.length) return width;
		width = value;
		return toxicityChart;
	};

	toxicityChart.height = function (value) {
		if (!arguments.length) return height;
		height = value;
		return toxicityChart;
	};

	var n = 4, // number of layers
	m = 64, // number of samples per layer
	data = d3.layout.stack()(stream_layers(n, m, 0.1));

	var mx = m,
		my = d3.max(data, function(d) {
			return d3.max(d, function(d) {
				return d.y0 + d.y;
			});
		}),
		mz = d3.max(data, function(d) {
			return d3.max(d, function(d) {
				return d.y;
			});
		}),
		x = function(d) { return d.x * width / mx; },
		y0 = function(d) { return height - d.y0 * height / my; },
		y1 = function(d) { return height - (d.y + d.y0) * height / my; },
		y2 = function(d) { return d.y * height / mz; }; // or `my` to not rescale

	/* Inspired by Lee Byron's test data generator. */
	function stream_layers(n, m, o) {
		if (arguments.length < 3) o = 0;
		function bump(a) {
			var x = 1 / (0.1 + Math.random()),
			y = 2 * Math.random() - 0.5,
			z = 10 / (0.1 + Math.random());
			for (var i = 0; i < m; i++) {
				var w = (i / m - y) * z;
				a[i] += x * Math.exp(-w * w);
			}
		}
		return d3.range(n).map(function() {
			var a = [], i;
			for (i = 0; i < m; i++) a[i] = o + o * Math.random();
				for (i = 0; i < 5; i++) bump(a);
					return a.map(stream_index);
			});
	}

	/* Another layer generator using gamma distributions. */
	function stream_waves(n, m) {
		return d3.range(n).map(function(i) {
			return d3.range(m).map(function(j) {
				var x = 20 * j / m - i / 3;
				return 2 * x * Math.exp(-0.5 * x);
			}).map(stream_index);
		});
	}

	function stream_index(d, i) {
		return {x: i, y: Math.max(0, d)};
	}

	return toxicityChart;

	});