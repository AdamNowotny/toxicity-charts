/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      src: [ 'build' ]
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
        loadFixtures: true,
        require: true
      }
    },
    mincss: {
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
          out: 'build/main.js',
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
          basePath: "."
        },
        files: {
          'build': [
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
    },
    jasmine: {
      all: ['spec/specrunner.html']
    }
  });

  // Default task.
  grunt.registerTask('default', 'clean lint mincss requirejs copy');
  grunt.registerTask('full', 'clean lint jasmine mincss requirejs copy');

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-jasmine-task');
};