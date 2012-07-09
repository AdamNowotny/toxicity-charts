define(['jquery', 'd3', 'bootstrap'], function ($, d3) {

	'use strict';
	
	var activeChart = 'treemap',
		activeMetric = 'lines',
		fileLoaded,
		chartChanged = function() {};

	function navigation() {
		$(".dropdown-toggle").dropdown();
		attachTreemapMenu();
		$("#toxicity").click(function () {
			activeChart = 'toxicity';
			activeMetric = null;
			navigation.update();
		});
		$('#metricFile').change(fileChanged);
	}

	function activateItem (id) {
		$('.nav li').removeClass('active');
		var menuItem = $('#' + id);
		menuItem.addClass('active');
		menuItem.closest('.nav > li').addClass('active');
	}

	function fileChanged (evt) {
		var file = evt.target.files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			fileLoaded(file.name, e.target.result);
		};
		reader.readAsText(file);
	}

	function attachTreemapMenu () {
		$('#menu-treemap li').click(function () {
			activeChart = 'treemap';
			activeMetric = this.id;
			navigation.update();
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

	navigation.update = function() {
		var menuId = (activeMetric) ? activeMetric : activeChart;
		activateItem(menuId);
		chartChanged(activeChart, activeMetric);
	};

	return navigation;

});