require.config({
	baseUrl: 'src',
	paths: {
		jquery: [ 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min', '../lib/jquery/jquery-1.7.2' ],
		bootstrap: [ 'http://current.bootstrapcdn.com/bootstrap-v204/js/bootstrap.min', '../lib/bootstrap/js/bootstrap.min' ],
		d3: '../lib/d3/d3.v2.min',
		nvd3: '../lib/nvd3/nv.d3.modified',
		feature: '../lib/require-js/feature',
		implementations: '../featuresConfig'
	},
	deps: [	'arrayExtensions', 'stringExtensions' ],
	shim: {
		d3: { exports: 'd3'	},
		bootstrap: [ 'jquery' ]
	}
});
require(['app'], function (app) {
	app();
});