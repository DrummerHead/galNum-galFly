module.exports = function(grunt){
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: {
          'temp/galFly/gedrag.min.js': ['src/galFly/gedrag.js']
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'src/galFly/',
        src: ['*.css', '!*.min.css'],
        dest: 'temp/galFly/',
        ext: '.min.css'
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'temp/galFly/index.min.html': 'temp/galFly/index_for_minification.html'
        }
      }
    }
  });

  grunt.registerTask('default', ['uglify', 'cssmin'])
}
