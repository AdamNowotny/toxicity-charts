/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('default', ['clean', 'jshint', 'karma:once', 'cssmin', 'requirejs', 'copy']);
  grunt.registerTask('watch', ['karma:watch']);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-karma');
  
  grunt.initConfig({
    clean: {
      src: [ 'build' ]
    },
    jshint: {
      files: ['src/**/*.js', 'spec/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      once: {
        singleRun: true
      },
      watch: {
        singleRun: false
      }
    },
    cssmin: {
      compress: {
        files: {
          'build/css/main.css': [ 'css/main.css' ]
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src",
          name: "main",
          mainConfigFile: 'src/main.js',
          out: 'build/src/main.js',
          paths: {
            jquery: 'empty:',
            bootstrap: 'empty:',
            d3: 'empty:',
            nvd3: 'empty:'
          },
          inlineText: true,
          useStrict: true
        }
      }
    },
    copy: {
      dist: {
        options: {
          basePath: '.'
        },
        files: {
          'build/': [
            'index.html',
            'lib/require-js/require.min.js',
            'lib/jquery/jquery-1.7.2.min.js',
            'lib/bootstrap/css/bootstrap.css',
            'lib/bootstrap/img/*',
            'lib/bootstrap/js/bootstrap.min.js',
            'lib/d3/d3.v2.min.js',
            'lib/nvd3/nv.d3.min.js'
          ]
        }
      }
    }
  });

};
