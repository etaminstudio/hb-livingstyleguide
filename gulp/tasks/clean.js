'use strict';

var rm         = require('rimraf');
var config     = require('../config');
var gulp       = require('gulp');

gulp.task('clean:www', function(cb) {
  rm.sync(config.harp.output);
  cb();
});

gulp.task('clean:build', function(cb) {
  rm.sync(config.build.output + '/assets');
  rm.sync(config.build.output + '/jade');
  rm.sync(config.build.output + '/*.js');
  cb();
});

gulp.task('clean', ['clean:build', 'clean:www']);


