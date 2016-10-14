var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var dist = 'dist/'
var cssSource = ['dev/angular-drag-resize.css'];
var jsSource = ['dev/angular-drag-resize.js'];

gulp.task('css-minify', function() {
	return gulp.src(cssSource)
    .pipe(rename('angular-drag-resize.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dist))
	;
});

gulp.task('jshint', function() {
  return gulp.src(jsSource)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('js-minify', function() {
	return gulp.src(jsSource)
    .pipe(rename('angular-drag-resize.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist))
	;
});

gulp.task('build', function() {
	css-minify();
	jshint();
	js-minify();
});
