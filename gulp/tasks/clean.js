'use strict';

var config = require('../config');
var gulp = require('gulp');
var del = require('del');

// Delete everything in config.harp.output
gulp.task('clean:www', function(cb) {
  del.sync([config.harp.output + '/**', '!' + config.harp.output]);
  console.log('Deleted everything in ' + config.harp.output);
  cb();
});

// Delete everything in config.build.output
gulp.task('clean:build', function(cb) {
  del.sync([config.build.output + '/**', '!' + config.build.output]);
  console.log('Deleted everything in ' + config.build.output);
  cb();
});

// Delete both
gulp.task('clean', ['clean:build', 'clean:www']);
