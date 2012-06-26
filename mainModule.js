define([
	'jquery',
	'd3',
	'treemapDataBuilder',
	'fxcopParser',
	'treemapChart',
	'navigation'], function ($, d3, dataBuilder, parser, treemap, navigation) {

	var selection;

	function mainModule () {
		treemap.sizeAxis('lines').colorAxis('lines');
		navigation.fileLoaded(parseMetricFile).chartChanged(updateChart)();
	}

	function parseMetricFile(filename, content) {
		$('#chart').html('');
		var treemapData = parser(filename, content);
			treemap.depth(dataBuilder.getDepth(treemapData))
			.width($('.chart-container').width())
			.height($('.chart-container').height());
			selection = d3.select('#chart').data([treemapData]);
		$('.hero-unit').slideUp('slow', function () {
			treemap(selection);
		});
	}

	function updateChart(metricName) {
		treemap.colorAxis(metricName)
			.width($('.chart-container').width())
			.height($('.chart-container').height());
		if (selection) treemap(selection);
	}

	return mainModule;
});