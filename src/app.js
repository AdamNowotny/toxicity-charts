define([
	'jquery',
	'd3',
	'fxcopParser',
	'treemapDataBuilder',
	'treemapChart',
	'toxicityDataBuilder',
	'feature!toxicityChart',
	'navigation'
	], function ($, d3, parser, treemapDataBuilder, treemap, toxicityDataBuilder, toxicity, navigation) {

	'use strict';
	
	var fxcopData,
		selection = {
			treemap : null,
			toxicity : null
		};

	function mainModule () {
		navigation.fileLoaded(parseMetricFile).chartChanged(updateChart)();
	}

	function parseMetricFile(filename, content) {
		$('.chart, .legend').html('');
		fxcopData = parser(content);
		loadTreemap(fxcopData, filename);
		loadToxicity(fxcopData);
		navigation.update();
	}

	function updateChart(name, /* optional */ metricName) {
		if (!fxcopData) return;
		$('.hero-unit').slideUp('slow', function () {
			var selector = '.' + name;
			$('.chart:not('+ selector + ')').fadeOut('slow');
			$('.legend:not('+ selector + ')').fadeOut('slow');
			$(selector).addClass('back').fadeIn('fast').removeClass('back');
			if (name === 'treemap') {
				showTreemap(metricName);
			}
			if (name === 'toxicity') {
				showToxicity();
			}
		});
	}

	function loadTreemap (fxcopData, filename) {
		var treemapData = treemapDataBuilder(fxcopData, filename);
		selection.treemap = d3.select('.treemap').data([treemapData]);
		treemap.depth(treemapDataBuilder.getDepth(treemapData));
	}

	function loadToxicity (fxcopData) {
		var toxicityData = toxicityDataBuilder(fxcopData);
		selection.toxicity = d3.select('.toxicity').data([toxicityData]);
	}

	function showTreemap (metric) {
		treemap.colorAxis(metric);
		treemap.width($('.chart-container').width())
			.height($('.chart-container').height());
		treemap(selection.treemap);
	}

	function showToxicity () {
		$('.toxicity').html('');
		toxicity.width($('.chart-container').width())
			.height($('.chart-container').height());
		toxicity(selection.toxicity, fxcopData);
	}

	return mainModule;
});