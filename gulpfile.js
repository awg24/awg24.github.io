'use strict';
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var babelify = require('babelify');
var webserver = require('gulp-webserver');
var path = require('path');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

// add custom browserify options here
var customOpts = {
	entries: ['./scripts/main.js'],
	debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify));

gulp.task('js-bundle', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('webserver', function() {
	gulp.src('./')
	.pipe(webserver({
		fallback: 'index.html',
		livereload: false,
		directoryListing: {
			enable: false,
			path: './'
		},
		open: true
	}));
});

gulp.task('serve', ['js-bundle', 'webserver', 'serve-sass'], function() {
	gulp.watch('styles/**/*.{scss,sass}', ['serve-sass']);
});

function bundle() {
	return b.bundle()
	// log errors if they happen
	.on('error', gutil.log.bind(gutil, 'Browserify Error'))
	.pipe(source('all.js'))
	// optional, remove if you don't need to buffer file contents
	.pipe(buffer())
	// optional, remove if you dont want sourcemaps
	.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
	// Add transformation tasks to the pipeline here.
	.pipe(sourcemaps.write('./')) // writes .map file
	.pipe(gulp.dest('./scripts'));
}

gulp.task('serve-sass', function() {
	return gulp.src('styles/**/*.{scss,sass}')
	.pipe(sass({
		errLogToConsole: true
	}).on('error', sass.logError))
	.on('error', function(err) {
		console.log(err);
	})
	.pipe(rename(function(p) {
		p.basename += '.sass';
		p.extname = '.css';
	}))
	.on('error', function(err) {
		console.log(err);
	})
	.pipe(gulp.dest(path.join('styles')));
});