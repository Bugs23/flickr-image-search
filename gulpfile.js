// Include gulp
var gulp = require('gulp');

// Included Plugins
var connect = require('gulp-connect');

// Live reload
gulp.task('connect', function() {
	connect.server({
		root:'.',
		livereload: true
	})
});

// Default Task
gulp.task('default', ['connect']);