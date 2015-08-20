var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var assign = require('lodash.assign');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var server = require('gulp-express');
var karma = require('karma');
var babelify = require("babelify");


var paths = {
	"javaScript": ['app/dev/**/*.js', '!app/dev/build/**/*.js', '!./app/dev/vendor/*.js', '!./app/dev/app.js'],
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
	 
	return karma.server.start({
	    configFile: __dirname+'/karma.conf.js',
	    logLevel: 'LOG_DISABLE',
	    singleRun: false
  });
});

var customOpts = {
  entries: ['./app/dev/gridApp.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

  b.transform(babelify);

// i.e. b.transform(coffeeify);

gulp.task('browserify', ['lint'], bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./maps')) // writes .map file
    .pipe(gulp.dest('./app/dev/build/js/')) 
    .pipe(livereload());
}
		
gulp.task('watch', function(){
	livereload.listen();
	startServer();
	// gulp.watch([paths.javaScript, paths.tests], ['test']);
	gulp.watch(paths.scss, ['sass']);
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.javaScript, ['lint', 'browserify']);
})
