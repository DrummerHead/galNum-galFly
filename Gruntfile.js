module.exports = function(grunt){
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: {
          'temp/galFly/main.min.js': ['src/galFly/main.js'],
          'temp/galNum/main.min.js': ['src/galNum/main.js']
        }
      }
    },
    cssmin: {
      minify: {
        files: {
          'temp/galFly/main.min.css' : ['src/galFly/main.css'],
          'temp/galNum/main.min.css' : ['src/galNum/main.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'temp/galFly/index.min.html': 'temp/galFly/index_for_minification.html',
          'temp/galNum/index.min.html': 'temp/galNum/index_for_minification.html'
        }
      }
    }
  });

  grunt.registerTask('default', ['uglify', 'cssmin'])
}
