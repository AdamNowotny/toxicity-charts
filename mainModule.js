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
		};

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
			$('.chart:not(.' + name + ')').hide('slow');
			$('.' + name).show('slow');
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
				selection.toxicity = d3.select('.toxicity').data([chartData]);
		}
		toxicity.width($('.chart-container').width())
			.height($('.chart-container').height());
		toxicity(selection.toxicity);
	}

	return mainModule;
});