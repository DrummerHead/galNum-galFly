var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var bs = require('browser-sync').create();
var through2 = require('through2')
var browserify = require('browserify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('js', function(){
  return gulp.src(['src/galFly/main.js', 'src/galNum/main.js' ], {base: 'src/'})
    .pipe(through2.obj(function(file, enc, next){
      browserify({
        entries: file.path,
        debug: false
      }).bundle(function(err, res){
        if(err){
          return next(err);
        }
        file.contents = res;
        next(null, file);
      })
    }))
    .on('error', function(error){
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(gulp.dest('.tmp/src'))
});

gulp.task('uglify', ['js'], function(){
  return gulp.src(['.tmp/src/galFly/main.js', '.tmp/src/galNum/main.js' ], {base: '.tmp/src/'})
    .pipe(uglify())
    .pipe(gulp.dest('temp'));
});

gulp.task('uglify:dist', function(){
  return gulp.src(['dist/*.js', '!dist/*.min.js', '!dist/*.html.js'])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
    .pipe(through2.obj(function(file, enc, next){
      var name = file.relative.replace('.min.js','');
      var preFile = '<a href="javascript:(function(){';
      var safeJS = encodeURIComponent(file.contents.toString());
      var postFile = '})();" class=\'bookmarklet\' title=\'Drag me to your Bookmarks Toolbar\'>' + name + '</a>';

      file.contents = new Buffer(preFile + safeJS + postFile);

      return next(null, file)
    }))
    .pipe(rename({suffix: '.html'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function(){
  return gulp.src(['src/galFly/main.scss', 'src/galNum/main.scss'], {base: 'src/'})
    .pipe(sass.sync({
      outputStyle: 'expanded'
    })).on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 1 version']
    }))
    .pipe(gulp.dest('.tmp/src'))
});

gulp.task('cssmin', ['sass'], function(){
  return gulp.src(['.tmp/src/galFly/main.css', '.tmp/src/galNum/main.css'], {base: '.tmp/src/'})
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

var generateServer = function(port, name){
  return function(){
    bs.init({
      port: port,
      server: {
        baseDir: ['.tmp/src/' + name + '/', 'src/' + name + '/']
      }
    });

    gulp.watch(['src/' + name + '/main.js', 'src/node_modules/*.js'], ['js']);
    gulp.watch(['src/**/*.scss'], ['sass']);

    gulp.watch([
      '.tmp/src/' + name + '/main.js',
      '.tmp/src/' + name + '/main.css'
    ]).on('change', bs.reload);

  };
}

gulp.task('serve:fly', ['js'], generateServer(9090, 'galFly'));
gulp.task('serve:num', ['js'], generateServer(9080, 'galNum'));


gulp.task('default', ['uglify', 'cssmin']);