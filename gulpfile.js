'use strict';

// Include gulp
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var express = require('express');
var directory = require('serve-index');
var browser = require('open');

gulp.task('lint', function () {
  return gulp.src(['./src/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

//watch Files For Changes
gulp.task('watch', function () {
  var app = express();
  app.use(express.static('./'));
  app.use(directory('./'));
  app.listen(8090);
  browser('http://localhost:8090/index.html', 'Google Chrome');
});


//tasks aliases
gulp.task('default', ['less', 'scripts']);
