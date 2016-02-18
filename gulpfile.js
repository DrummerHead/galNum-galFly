var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var bs = require('browser-sync').create();


gulp.task('uglify', function(){
  return gulp.src(['src/galFly/main.js', 'src/galNum/main.js' ], {base: 'src/'})
    .pipe(uglify())
    .pipe(gulp.dest('temp'));
});

gulp.task('cssmin', function(){
  return gulp.src(['src/galFly/main.css', 'src/galNum/main.css'], {base: 'src/'})
    .pipe(cssnano())
    .pipe(gulp.dest('temp'));
});

gulp.task('htmlmin', function(){
  return gulp.src(['temp/galFly/index_for_minification.html', 'temp/galNum/index_for_minification.html' ], {base: 'temp/'})
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename(function(path){
      path.basename = 'index';
      path.extname = '.min.html';
      return path;
    }))
    .pipe(gulp.dest('temp'));
});

gulp.task('serve:fly', function(){
  bs.init({
    port: 9090,
    server: {
      baseDir: 'src/galFly/'
    }
  });

  gulp.watch(['src/galFly/*.js', 'src/galFly/*.html', 'src/galFly/*.css'])
    .on('change', bs.reload);
});


gulp.task('default', ['uglify', 'cssmin']);