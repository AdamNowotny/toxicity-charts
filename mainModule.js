define([
	'jquery',
	'd3',
	'treemapDataBuilder',
	'fxcopParser',
	'treemapChart',
	'toxicityChart',
	'navigation'
	], function ($, d3, dataBuilder, parser, treemap, toxicity, navigation) {

	var chartData,
		selection = {
			treemap : null,
			toxicity : null,
			clear : function () {
				selection.treemap = null;
				selection.toxicity = null;
			}
		},
		metrics = ['complexity', 'lines'];

	function mainModule () {
		navigation.fileLoaded(parseMetricFile).chartChanged(updateChart)();
	}

	function parseMetricFile(filename, content) {
		$('.chart').html('');
		chartData = parser(filename, content);
		selection.clear();
		navigation.update();
	}

	function updateChart(name, /* optional */ metricName) {
		if (!chartData) return;
		$('.hero-unit').slideUp('slow', function () {
			var selector = '.' + name;
			$('.chart:not('+ selector + ')').hide('slow');
			$(selector).show('slow');
			if (name === 'treemap') {
				showTreemap(metricName);
			}
			if (name === 'toxicity') {
				showToxicity();
			}
		});
	}

	function showTreemap (metric) {
		treemap.colorAxis(metric);
		if (!selection.treemap) {
			selection.treemap = d3.select('.treemap').data([chartData]);
			treemap.depth(dataBuilder.getDepth(selection.treemap));
		}
		treemap.width($('.chart-container').width())
			.height($('.chart-container').height());
		treemap(selection.treemap);
	}

	function showToxicity () {
		$('.toxicity').html('');
		if (!selection.toxicity) {
			var fxcopData = [
				{
					name: 'class1',
					complexity: 10,
					lines: 20
				},
				{
					name: 'class2',
					complexity: 60,
					lines: 40
				}
			];
			var toxicityData = groupByLayer(fxcopData);
			selection.toxicity = d3.select('.toxicity').data([toxicityData]);
		}
		toxicity.width($('.chart-container').width())
			.height($('.chart-container').height());
		toxicity(selection.toxicity);
	}

	function groupByLayer (data) {
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
	return mainModule;
});