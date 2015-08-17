var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var karma = require('gulp-karma');
var watchify = require('watchify');
var browserify = require('browserify');
var assign = require('lodash.assign');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var server = require('gulp-express');

var paths = {
	"javaScript": ['app/dev/**/*.js'],
	"scss": ['app/dev/**/*.scss'],
	"html": ['app/dev/**/*.html', 'app/index.html'],
	"tests": ['test/spec/*.js']
}

gulp.task('html', function() { 
	return gulp.src(paths.html ) 
	.pipe(livereload()); 
});


gulp.task('sass', function () {
		return gulp.src(paths.scss)
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.init())
        .pipe(sass({ includePaths : paths.scss }))
		.pipe(sass())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./app/build/css'));
});

gulp.task('lint', function () {
		return gulp.src([paths.javaScript, '!./app/components/vendor/*.js']) 
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('js:karma', function() {
	return gulp.src(karmaTestFiles)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', function(err) {
			throw err;
		});
});

var startServer = function() {
	var express = require('express');
		var app = express();
		app.use(express.static(__dirname));
		app.listen(4000);

}
		
gulp.task('watch', function(){
		livereload.listen();
		startServer();
		gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.html, ['html']);
})
