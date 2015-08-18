var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var watchify = require('watchify');
var browserify = require('browserify');
var assign = require('lodash.assign');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var server = require('gulp-express');
var karma = require('karma').server;

var paths = {
	"javaScript": ['app/dev/**/*.js', '!app/dev/build/**/*.js', '!./app/dev/vendor/*.js'],
	"scss": ['app/dev/**/*.scss'],
	"html": ['app/dev/**/*.html'],
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
		.pipe(sass())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('app/build/css'));
});

gulp.task('lint', function () {
		return gulp.src(paths.javaScript) 
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('karma', function() {
	return gulp.src()
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
		app.use(express.static(__dirname + '/app/dev'));
		app.listen(4000);

}

gulp.task('test', function (done) {
	 
	  karma.start({ 
	    singleRun: true 
	  }, function (exitCode) { 
	    gutil.log('Karma has exited with ' + exitCode); 
	    process.exit(exitCode); 
	  }); 

});
		
gulp.task('watch', function(){
		livereload.listen();
		startServer();
		gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.javaScript, ['lint', 'test']);
})
