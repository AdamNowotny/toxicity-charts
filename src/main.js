require.config({
	baseUrl: 'src',
	paths: {
		jquery: [ 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min', '../lib/jquery/jquery-1.7.2.min' ],
		bootstrap: [ 'http://current.bootstrapcdn.com/bootstrap-v204/js/bootstrap.min', '../lib/bootstrap/js/bootstrap.min' ],
		d3: '../lib/d3/d3.v2.min',
		nvd3: '../lib/nvd3/nv.d3.min',
		feature: '../lib/require-js/feature',
		amdutils: '../lib/amd-utils/src',
		implementations: '../featuresConfig'
	},
	shim: {
		d3: { exports: 'd3'	},
		nvd3: {
			deps: ['d3'],
			exports: 'nv'
		},
		bootstrap: [ 'jquery' ]
	}
});
require(['app'], function (app) {
	'use strict';
	
	app();
});