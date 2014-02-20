module.exports = function(grunt){
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: {
          'temp/galFly/gedrag.min.js': ['src/galFly/gedrag.js'],
          'temp/galNum/gedrag.min.js': ['src/galNum/gedrag.js']
        }
      }
    },
    cssmin: {
      minify: {
        files: {
          'temp/galFly/stijl.min.css' : ['src/galFly/stijl.css'],
          'temp/galNum/stijl.min.css' : ['src/galNum/stijl.css']
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
