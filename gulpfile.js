var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    webpack = require('webpack-stream'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    browserSync= require('browser-sync').create();

var processors = [
                    autoprefixer,
                 ];

gulp.task('sass', function(){
  return gulp.src("./assets/sass/base/base.+(scss|sass)")
        .pipe(plumber())
        .pipe(sass({errorLogToConsole: true}))
        .pipe(postcss(processors)
        .on('error', function(errorInfo){
          console.log(errorInfo.toString());
          this.emit('end');
        }))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
  return gulp.src("./assets/js/index.js")
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream());
});

gulp.task('serve', function(){
  browserSync.init({
    server: './',
  })

  gulp.watch("./assets/sass/**/*.+(scss|sass)", ['sass']);
	gulp.watch("./assets/js/*.js", ['scripts']);
	gulp.watch("./*.html").on('change', browserSync.reload);

});

gulp.task('default', ['sass', 'scripts', 'serve']);
