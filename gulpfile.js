var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync= require('browser-sync').create();


gulp.task('sass', function(){
  return gulp.src("./assets/sass/*.sass")
        .pipe(sass({outputStyle: "compressed", errorLogToConsole: true}))
        .pipe(concat("styles.min.css"))
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
  return gulp.src("./assets/js/*.js")
        .pipe(concat("bundle.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream());
});

gulp.task('serve', function(){
  browserSync.init({
    server: './',
  })
	gulp.watch("assets/sass/*.sass", ['sass']);
	gulp.watch("./assets/js/*.js", ['scripts']);
	gulp.watch("./*.html").on('change', browserSync.reload);

});

gulp.task('default', ['sass', 'scripts', 'serve']);
