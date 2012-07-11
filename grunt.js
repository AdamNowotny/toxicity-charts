/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      src: [ 'dist' ]
    },
    lint: {
      files: ['src/**/*.js', 'spec/**/*.js']
    },
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        undef: true,
        browser: true,
        strict: true,
        trailing: true
      },
      globals: {
        define: true,
        describe: true,
        it: true,
        expect: true,
        jasmine: true,
        beforeEach: true,
        loadFixtures: true
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src",
          name: "../mainModule",
          mainConfigFile: 'mainModule.js',
          out: 'dist/mainModule.js',
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
    },
    copy: {
      dist: {
        options: {
          basePath: "."
        },
        files: {
          'dist': [
            'index.html',
            'main.css',
            'lib/require-js/require.min.js',
            'lib/jquery/jquery-1.7.2.min.js',
            'lib/bootstrap/css/bootstrap.css',
            'lib/bootstrap/img/*',
            'lib/bootstrap/js/bootstrap.min.js',
            'lib/d3/d3.v2.min.js',
            'lib/nvd3/nv.d3.modified.js'
          ]
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'clean lint requirejs copy');

  grunt.loadNpmTasks('grunt-contrib');
};
