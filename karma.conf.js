// Karma configuration
// Generated on Wed Aug 28 2013 22:18:26 GMT+1000 (AUS Eastern Standard Time)

module.exports = function (config) {
	'use strict';

	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '.',


		// frameworks to use
		frameworks: ['jasmine', 'requirejs'],

		// don't use html2js for Handlebars templates
		preprocessors: {
		},

		// list of files / patterns to load in the browser
		files: [
			{pattern: 'lib/jasmine-1.1.0/jasmine-jquery.js', watched: false, served: true, included: true},
			'spec/test.js',
			{pattern: 'src/**/*', watched: true, served: true, included: false},
			{pattern: 'lib/**/*', watched: true, served: true, included: false},
			{pattern: 'spec/**/*', watched: true, served: true, included: false},
		],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};
