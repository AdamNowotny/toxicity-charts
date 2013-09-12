/* global console */
require.config({
	baseUrl: '/base/src',
	paths: {
		spec: '../spec',
		fixtures: '../spec/fixtures',
		jquery: '../lib/jquery/jquery-1.7.2.min',
		text: '../lib/require-js/text',
		d3: '../lib/d3/d3.v2.min',
		bootstrap: '../lib/bootstrap/js/bootstrap.min',
		amdutils: '../lib/amd-utils/src'
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

jasmine.getFixtures().fixturesPath = '/base/spec/fixtures';

var tests = Object.keys(window.__karma__.files).filter(function (file) {
	'use strict';
	return (/Spec\.js$/).test(file);
});

require.config({
	baseUrl: '/base/src',
	deps: tests,
	callback: window.__karma__.start
});