/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      src: [ 'dist' ]
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
  grunt.registerTask('default', 'lint qunit concat min');
  
  grunt.registerTask('dist', 'clean requirejs copy');

  grunt.loadNpmTasks('grunt-contrib');
};
