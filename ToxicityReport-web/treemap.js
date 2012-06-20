var treemap = function () {

	var width = window.innerWidth - 20,
		height = window.innerHeight - 60,
		namespaceColorScale = d3.scale.linear().range(["white", "black"]),
		classColor = d3.scale.linear().range(["white", "red", "black"]);

	var maxMetric = {
		lines: 500,
		linesPerMethod: 30,
		complexity: 10,
		coupling: 10
	};

	var cellColor = function (d, metricName) {
		var max = maxMetric[metricName];
		var color = classColor.domain([0, max, max * 2])(d[metricName]);
		var borderColor = namespaceColorScale(d.depth);
		return d.children ? borderColor : color;
	};

	var cellTextColor = function (d, metricName) {
		var max = maxMetric[metricName];
		var color = d[metricName] > max ? "white" : "black";
		return d.children ? null : color;
	};

	var div;
	var treemap = d3.layout.treemap()
		.size([width, height])
		.sticky(true)
		.value(function (d) { return d.lines; })
		.padding(3);

	var initialize = function (json) {
		// reset cached state when switching datasets with a sticky layout
		treemap.sticky(true);
		d3.select("#chart div").remove();
		div = d3.select("#chart").append("div")
			.style("position", "relative")
			.style("width", width + "px")
			.style("height", height + "px");
		namespaceColorScale.domain([0, 7]);
		update(json);
	};
	var update = function (json) {
		var chart = div.data([json]).selectAll("div")
		  .data(treemap.nodes);
		chart.enter().append("div")
		  .attr("class", "cell")
		  .style("background", function (d) { return cellColor(d, "lines"); })
		  .style("color", function (d) { return cellTextColor(d, "lines"); })
		  .call(cell)
		  .call(cellContent("lines"));
		chart.exit().remove();

		d3.select("#lines").on("click", function () {
			div.selectAll("div")
			.data(treemap.value(function (d) { return d.lines; }))
			.call(cellContent("lines"))
		  .transition()
			.duration(1500)
			.style("background", function (d) { return cellColor(d, "lines"); })
			.style("color", function (d) { return cellTextColor(d, "lines"); })
			.call(cell);

			activateButton("lines");
		});

		d3.select("#linesPerMethod").on("click", function () {
			div.selectAll("div")
			.data(treemap.value(function (d) { return d.lines; }))
			.call(cellContent("linesPerMethod"))
		  .transition()
			.duration(1500)
			.style("background", function (d) { return cellColor(d, "linesPerMethod"); })
			.style("color", function (d) { return cellTextColor(d, "linesPerMethod"); })
			.call(cell);

			activateButton("linesPerMethod");
		});

		d3.select("#complexity").on("click", function () {
			div.selectAll("div")
			.data(treemap.value(function (d) { return d.lines; }))
			.call(cellContent("complexity"))
		  .transition()
			.duration(1500)
			.style("background", function (d) { return cellColor(d, "complexity"); })
			.style("color", function (d) { return cellTextColor(d, "complexity"); })
			.call(cell);

			activateButton("complexity");
		});

		d3.select("#coupling").on("click", function () {
			div.selectAll("div")
			.data(treemap.value(function (d) { return d.lines; }))
			.call(cellContent("coupling"))
		  .transition()
			.duration(1500)
			.style("background", function (d) { return cellColor(d, "coupling"); })
			.style("color", function (d) { return cellTextColor(d, "coupling"); })
			.call(cell);

			activateButton("coupling");
		});

		d3.select("#namespace").on("click", function () {
			div.selectAll("div")
			.data(treemap.value(function (d) { return d.lines; }))
			.html(function (d) { return d.children ? null : d.parent.name; })
		  .transition()
			.duration(1500)
			.style("background", function (d) { return d.children ? namespaceColorScale(d.depth) : null; })
			.call(cell);

			activateButton("namespace");
		});

	};

	var activateButton = function (name) {
		d3.selectAll(".navigation button").classed("active", function () {
			return this.id == name ? true : false;
		});
	};

	function cell() {
		this
		  .style("left", function (d) { return d.x + "px"; })
		  .style("top", function (d) { return d.y + "px"; })
		  .style("width", function (d) { return Math.max(0, d.dx - 1) + "px"; })
		  .style("height", function (d) { return Math.max(0, d.dy - 1) + "px"; });
	}

	function cellContent(metricName) {
		return function () {
			this.html(function (d) {
				var metricView = function () {
					var metric = d[metricName];
					return Math.round(metric);
				};
				return d.children ? null : d.name + "<br/>" + metricView();
			});
		}
	}

	return {
		initialize: initialize,
		update: update
	}
} ();