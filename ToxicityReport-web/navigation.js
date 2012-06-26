var navigation = (function ($) {

	var fileLoaded;
	var chartChanged;

	function navigation() {
		$(".dropdown-toggle").dropdown();
		attachTreemapMenu();
		d3.select('#metricFile').on('change', fileChanged);
	}

	function fileChanged (evt) {
		var file = d3.event.target.files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			fileLoaded(e.target.result);
		};
		reader.readAsText(file);
	}

	function attachTreemapMenu () {
		d3.selectAll('#menu-treemap .dropdown-menu li').on('click', function () {
			var activateButton = function (name) {
				d3.selectAll('#menu-treemap .dropdown-menu li').classed('active', function () {
					return this.id == name;
				});
			};
			$(this).closest('.nav > li').addClass('active');
			activateButton(this.id);
			chartChanged(this.id);
		});
	}

	navigation.fileLoaded = function(value) {
		if (!arguments.length) return fileLoaded;
		fileLoaded = value;
		return navigation;
	};

	navigation.chartChanged = function(value) {
		if (!arguments.length) return chartChanged;
		chartChanged = value;
		return navigation;
	};

	return navigation;

})(jQuery);