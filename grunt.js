/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      src: [ 'build', 'dist' ]
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'spec/**/*.js']
    },
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src",
          name: "../mainModule",
          mainConfigFile: 'mainModule.js',
          out: 'dist/main.js',
          paths: {
            jquery: 'empty:',
            bootstrap: 'empty:',
            d3: 'empty:',
            nvd3: 'empty:'
          },
          pragmas: {
            doExclude: true
          }
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

  grunt.loadNpmTasks('grunt-contrib');
};
