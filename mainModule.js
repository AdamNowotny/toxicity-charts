define([
	'jquery',
	'd3',
	'treemapDataBuilder',
	'fxcopParser',
	'treemapDataBuilder',
	'treemapChart',
	'toxicityDataBuilder',
	'toxicityChart',
	'navigation'
	], function ($, d3, dataBuilder, parser, treemapDataBuilder, treemap, toxicityDataBuilder, toxicity, navigation) {

	var fxcopData,
		selection = {
			treemap : null,
			toxicity : null
		};

	function mainModule () {
		navigation.fileLoaded(parseMetricFile).chartChanged(updateChart)();
	}

	function parseMetricFile(filename, content) {
		$('.chart').html('');
		fxcopData = parser(content);
		loadTreemap(fxcopData, filename);
		loadToxicity(fxcopData);
		navigation.update();
	}

	function updateChart(name, /* optional */ metricName) {
		if (!fxcopData) return;
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

	function loadTreemap (fxcopData, filename) {
		var treemapData = treemapDataBuilder(fxcopData, filename);
		selection.treemap = d3.select('.treemap').data([treemapData]);
		treemap.depth(dataBuilder.getDepth(selection.treemap));
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
		toxicity(selection.toxicity);
	}

	return mainModule;
});